-- Insert Settings
insert into public.settings (id, cancellation_cutoff_hours, timezone)
values (1, 24, 'Europe/Madrid')
on conflict (id) do update set 
  cancellation_cutoff_hours = excluded.cancellation_cutoff_hours,
  timezone = excluded.timezone;

-- Insert Locations
insert into public.locations (id, name, type, address)
values 
  ('11111111-1111-1111-1111-111111111111', 'Main Studio', 'studio', '123 Fit St, Barcelona'),
  ('22222222-2222-2222-2222-222222222222', 'Barceloneta Beach', 'outdoor', 'Barceloneta Beach Area')
on conflict (id) do nothing;

-- Insert Session Templates
insert into public.session_templates (id, slug, title, description, location_id, max_slots, price)
values 
  ('33333333-3333-3333-3333-333333333333', 'hiit-burner-studio', 'HIIT Burner', 'High Intensity Interval Training to burn max calories.', '11111111-1111-1111-1111-111111111111', 10, 20.00),
  ('44444444-4444-4444-4444-444444444444', 'beach-bootcamp', 'Beach Bootcamp', 'Early morning bootcamp on the beach.', '22222222-2222-2222-2222-222222222222', 15, 15.00),
  ('55555555-5555-5555-5555-555555555555', 'strength-101', 'Strength 101', 'Introductory strength class with barbells.', '11111111-1111-1111-1111-111111111111', 6, 30.00)
on conflict (id) do nothing;

-- We cannot easily seed users in auth.users directly via SQL since it requires encrypted passwords and proper ID generation in a different schema. 
-- For development, users (especially the first admin) will be created via Supabase Studio or API.
