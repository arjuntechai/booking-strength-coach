# Implementation Plan: Personal Trainer Booking Web App

This document outlines the detailed step-by-step implementation plan for adding a Supabase backend and complete dashboard system to the existing personal trainer booking web app. 

## Proposed Architecture

- **Backend / Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email/Password)
- **Authorization**: Row Level Security (RLS) + Server-side custom role claims.
- **Frontend Framework**: React (via existing Vite + Tailwind setup)
- **Styling**: Tailwind CSS utilizing the `BRANDING.md` token system, plus `sonner` for toast notifications.

## Database Schema (High-Level)

1. **`users`** (Supabase Auth hooks into this via trigger): `id`, `email`, `role` (user, client, admin, banned), `created_at`.
2. **`client_profiles`**: `user_id` (PK), `first_name`, `last_name`, `phone`, `emergency_contact`, `injury_notes`, `goals`.
3. **`locations`**: `id`, `name`, `type` (studio, outdoor), `address`, `created_at`, `deleted_at`.
4. **`session_templates`**: `id`, `slug` (unique, generated from title), `title`, `description`, `location_id`, `max_slots`, `price`, `created_at`, `deleted_at`.
5. **`session_occurrences`**: `id`, `template_id`, `start_time` (UTC), `end_time` (UTC), `status` (scheduled, cancelled), `cancel_reason`, `created_at`, `deleted_at`.
6. **`bookings`**: `id`, `user_id`, `occurrence_id`, `status` (confirmed, cancelled_by_client, cancelled_by_admin, completed, no_show), `payment_status` (unpaid, paid_in_person, comped), `check_in`, `created_at`, `deleted_at`.
7. **`audit_logs`**: `id`, `table_name`, `record_id`, `action`, `old_data`, `new_data`, `changed_by` (user_id), `created_at`.
8. **`settings`**: `id` (single row pattern), `cancellation_cutoff_hours` (default 24), `timezone` (default Europe/Madrid).

## Implementation Phases

### Phase 1: Schema, RLS, Migrations, and Seed Data (Completed)
- Create the initial Supabase migration file defining all tables.
- Add constraints (e.g., checking `max_slots` availability before inserting a booking).
- Create triggers for soft deletes and generic audit logging on critical tables.
- Implement Row Level Security (RLS) policies:
  - `client_profiles`: Select/Update restricted to owner; Admin full access.
  - `bookings`: Select restricted to owner; Admin full access.
  - `session_occurrences`: Public read; Admin full access.
- **Occurrence Availability**: Create a security-definer function or DB view (`occurrence_availability`) exposing remaining slots per occurrence without exposing the `bookings` table to the public.
- Create seed data script for initial locations, templates, settings row, and testing users.
- *Note: First admin account must be created manually in the Supabase dashboard and given the admin role.*

**Done when:**
- [x] Supabase local/remote is running with all tables created.
- [x] RLS policies are active and verified.
- [x] Availability view/function correctly hides booking details while showing slot counts.
- [x] Constraints prevent overbooking.
- [x] Seed data populates the local database.

### Phase 2: Auth Flows, Route Guards, and Roles
- Install and configure `@supabase/supabase-js`.
- Build Auth Pages at root: `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/auth/callback`.
- Build Error Pages: `/404`, `/403` (Not Authorized), `/suspended` (Account Suspended).
- URL Structure & Guards: Use one layout wrapper per prefix (`/admin/*` and `/client/*`) to handle role guarding.
- Implement Edge Function for setting user roles (Client cannot upgrade themselves).
  - *Must refuse to ban or demote the last remaining admin.*
- Enforce logic where banned users are blocked immediately upon login attempt.

**Done when:**
- [ ] Users can sign up, log in, and log out.
- [ ] Layout wrappers successfully protect `/admin/*` and `/client/*` routes.
- [ ] Last admin cannot be demoted or banned.
- [ ] Attempting to access an admin route as a client redirects to `/403`.
- [ ] Banned users are redirected to `/suspended`.

### Phase 3: Client Booking Flow and Public Pages
- Build Public Pages at root: `/schedule` (browsing occurrences) and `/session/:slug` (session details using the new template slug).
- Implement UI to show Open / Few Spots / Full states driven by `occurrence_availability`.
- Build Client Dashboard: `/client/dashboard` (upcoming bookings).
- Build Client Profile Edit Page: `/client/profile` (phone, emergency contact, goals).
- Build Booking Details: `/client/bookings/:id`.
- Implement Booking Action: Transactional insert into `bookings`, upgrading the user role from 'user' to 'client' on first successful booking.
- Implement Cancellation Action via Edge Function: Enforces cancellation cutoff window (settings driven) server-side.

**Done when:**
- [ ] Visitors can view the schedule and session details without logging in.
- [ ] Users can book a session, automatically getting upgraded to 'client'.
- [ ] Clients can view their upcoming bookings and edit their profile.
- [ ] Clients can cancel their booking (server enforces time cutoff).

### Phase 4: Admin CRUD and Management
- Build Admin Dashboard: `/admin/dashboard` (high level stats, upcoming sessions).
- Build Session Management:
  - Templates CRUD: Create/Edit/Soft Delete templates (managing auto-generated unique slugs).
  - Schedule Occurrences: Assign templates to dates/times (stored UTC, rendered in Settings Timezone).
- Build Booking Management: Mark attendance (`completed`/`no_show`), update `payment_status` (paid_in_person, etc.).
- Build Client Management: `/admin/clients` list, and `/admin/clients/:id` (detailed view with full history, injury notes, role/ban controls).
- Build Settings Page: Manage cancellation cutoff windows, timezone, and locations.

**Done when:**
- [ ] Admins can create and schedule new sessions.
- [ ] Admins can manage all user roles (including ban/unban).
- [ ] Admins can mark attendance and payment statuses for bookings.
- [ ] Full audit history is viewable for client actions.

### Phase 5: Reporting and Dashboards
- Create Edge Functions or complex DB views to aggregate KPIs:
  - Fill rate per occurrence.
  - Attendance vs. No-show rate.
  - Cash collected.
  - New clients per month.
  - Most popular time slots.
- Build UI components (charts/stats cards) on the Admin Dashboard to visualize this data.

**Done when:**
- [ ] Admin dashboard displays accurate, real-time KPI metrics.
- [ ] Empty states and loading states are polished for all data tables.

### Phase 6: Notifications and Polish
- Setup Edge Function for transactional emails.
- Direct integration with Resend, wrapped in a single `sendEmail()` helper to allow easy swapping later.
- Hook up email triggers for: Booking Confirmation, Booking Cancellation.
- Refine all UI states: Ensure every list/table has explicit empty, loading, and error states.
- Ensure all toasts are implemented using `sonner`.
- Perform comprehensive responsive testing (mobile-first validation).

**Done when:**
- [ ] Email notifications trigger successfully upon booking events via Resend.
- [ ] All edge cases (loading, empty, error) have dedicated, branded UI states.
- [ ] The app is fully responsive and feels premium on mobile devices.
