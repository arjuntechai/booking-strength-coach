-- Enable pgcrypto for UUID generation
create extension if not exists "pgcrypto";

-- Custom Types
create type user_role as enum ('user', 'client', 'admin', 'banned');
create type session_status as enum ('scheduled', 'cancelled');
create type booking_status as enum ('confirmed', 'cancelled_by_client', 'cancelled_by_admin', 'completed', 'no_show');
create type payment_status as enum ('unpaid', 'paid_in_person', 'comped');
create type location_type as enum ('studio', 'outdoor');

-- 1. Users Table (syncs with auth.users)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role user_role not null default 'user',
  created_at timestamptz not null default now()
);

-- Trigger to create a user in public.users when a new auth user is created
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Client Profiles
create table public.client_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  first_name text,
  last_name text,
  phone text,
  emergency_contact text,
  injury_notes text,
  goals text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Locations
create table public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type location_type not null default 'studio',
  address text,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- 4. Session Templates
create table public.session_templates (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  location_id uuid references public.locations(id) on delete restrict,
  max_slots integer not null default 1 check (max_slots > 0),
  price numeric(10, 2) not null default 0,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- 5. Session Occurrences
create table public.session_occurrences (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.session_templates(id) on delete restrict,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status session_status not null default 'scheduled',
  cancel_reason text,
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  check (end_time > start_time)
);

-- 6. Bookings
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete restrict,
  occurrence_id uuid not null references public.session_occurrences(id) on delete restrict,
  status booking_status not null default 'confirmed',
  payment_status payment_status not null default 'unpaid',
  check_in boolean not null default false,
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique(user_id, occurrence_id) -- Prevent double booking by same user
);

-- Constraint for max slots check via trigger
create function public.check_max_slots()
returns trigger
language plpgsql
as $$
declare
  current_slots int;
  max_allowed int;
begin
  if new.status = 'confirmed' then
    select count(*) into current_slots from public.bookings 
    where occurrence_id = new.occurrence_id and status = 'confirmed';
    
    select st.max_slots into max_allowed
    from public.session_occurrences so
    join public.session_templates st on so.template_id = st.id
    where so.id = new.occurrence_id;

    if current_slots >= max_allowed then
      raise exception 'Session occurrence is full';
    end if;
  end if;
  return new;
end;
$$;

create trigger check_booking_slots
  before insert or update on public.bookings
  for each row execute procedure public.check_max_slots();

-- 7. Audit Logs
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  table_name text not null,
  record_id uuid not null,
  action text not null,
  old_data jsonb,
  new_data jsonb,
  changed_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- 8. Settings
create table public.settings (
  id integer primary key default 1 check (id = 1), -- Single row pattern
  cancellation_cutoff_hours integer not null default 24,
  timezone text not null default 'Europe/Madrid',
  updated_at timestamptz not null default now()
);

-- Occurrence Availability View (Security Definer Function alternative)
create or replace view public.occurrence_availability as
select 
  so.id as occurrence_id,
  st.max_slots,
  count(b.id) as booked_count,
  (st.max_slots - count(b.id)) as remaining_slots,
  case 
    when count(b.id) >= st.max_slots then 'Full'
    when (st.max_slots - count(b.id)) <= 2 then 'Few Spots'
    else 'Open'
  end as availability_status
from public.session_occurrences so
join public.session_templates st on so.template_id = st.id
left join public.bookings b on so.id = b.occurrence_id and b.status = 'confirmed'
group by so.id, st.max_slots;

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.client_profiles enable row level security;
alter table public.locations enable row level security;
alter table public.session_templates enable row level security;
alter table public.session_occurrences enable row level security;
alter table public.bookings enable row level security;
alter table public.settings enable row level security;
-- audit_logs is typically insert-only via trigger, maybe read by admin
alter table public.audit_logs enable row level security;

-- Admin Role Helper Function
create or replace function public.is_admin()
returns boolean
language sql
security definer
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$;

-- RLS Policies

-- Users
create policy "Users can view own data" on public.users for select using (auth.uid() = id);
create policy "Admins can view all users" on public.users for all using (public.is_admin());

-- Client Profiles
create policy "Users can view own profile" on public.client_profiles for select using (auth.uid() = user_id);
create policy "Users can update own profile" on public.client_profiles for update using (auth.uid() = user_id);
create policy "Users can insert own profile" on public.client_profiles for insert with check (auth.uid() = user_id);
create policy "Admins can view and manage all profiles" on public.client_profiles for all using (public.is_admin());

-- Locations
create policy "Public can view active locations" on public.locations for select using (deleted_at is null);
create policy "Admins can manage locations" on public.locations for all using (public.is_admin());

-- Session Templates
create policy "Public can view active templates" on public.session_templates for select using (deleted_at is null);
create policy "Admins can manage templates" on public.session_templates for all using (public.is_admin());

-- Session Occurrences
create policy "Public can view active occurrences" on public.session_occurrences for select using (deleted_at is null);
create policy "Admins can manage occurrences" on public.session_occurrences for all using (public.is_admin());

-- Bookings
create policy "Users can view own bookings" on public.bookings for select using (auth.uid() = user_id);
create policy "Users can insert own bookings" on public.bookings for insert with check (auth.uid() = user_id);
-- Update/cancel via Edge Function primarily, but let's allow user to update their own booking (to cancel it? Edge function is safer for enforcing cutoff)
create policy "Admins can manage all bookings" on public.bookings for all using (public.is_admin());

-- Settings
create policy "Public can view settings" on public.settings for select using (true);
create policy "Admins can manage settings" on public.settings for all using (public.is_admin());

-- Audit Logs
create policy "Admins can view audit logs" on public.audit_logs for select using (public.is_admin());
