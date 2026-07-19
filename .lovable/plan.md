# Alex Moreno — Personal Trainer Landing Page

A single-route, mobile-first landing page focused on one action: booking a session. Calm-authority tone, no hype, orange used sparingly as a signal color (CTAs + live availability).

## Visual direction

- Palette (Midnight & Ember): background `#0a0b0d`, surface `#141619`, elevated `#2a2d33`, muted text on dark, ember accent `#ff5b14` for CTAs, availability dots, and key highlights only.
- Typography: strong hierarchy — a technical/geometric display face for headings (e.g. Space Grotesk), a clean neutral sans for body (e.g. Inter). Tight tracking on display, generous line-height on body.
- Layout: wide gutters on desktop, edge-to-edge grid on mobile. Thin hairline dividers (`#2a2d33`) instead of cards-on-cards. Small caps micro-labels for section eyebrows.
- Motion: restrained — subtle fade/rise on section enter, no parallax, no bouncy easing.
- Imagery: real-feeling, performance-focused, desaturated with warm shadow tint so orange remains the only saturated color on the page.

## Page structure (single route `/`)

1. **Sticky top bar** — wordmark left, "Book Your Session" ember button right, always visible so booking is one tap away.
2. **Hero** — outcome-driven headline (strength, consistency, efficiency), one supporting line, subtle "Studio · Outdoor — Barcelona" tag, primary CTA + "View Schedule" text link that scrolls to timetable.
3. **Schedule** — the visual centerpiece. Weekly timetable grid, Mon–Sat columns on desktop, horizontal-scroll day tabs on mobile. Each slot shows: class name, focus tag (Strength / Conditioning / Mobility), location tag (Studio / Outdoor), duration, availability dot (open = ember, limited = amber-ish ember, full = muted) and a "Book" action. Feels like a system, not a brochure.
4. **Trust / Coach** — portrait left, name + role, three tight credibility bullets, studio and outdoor imagery in a two-tile split beneath.
5. **Social proof** — 3 short testimonials (name, age, profession) in a hairline-divided row, plus a small community image strip mixing studio and outdoor.
6. **Logistics** — 4-column info grid (desktop) / stacked (mobile): Base location, Outdoor spots, Session length, What to bring. Below it, two short lists: "Who it's for" / "Who it's not for".
7. **Repeat booking CTA** — full-bleed ember-accented section, one line, one button.
8. **Footer** — minimal: location, contact line, socials.

## Routing & metadata

- Keep single route at `src/routes/index.tsx` (replaces the placeholder).
- Route `head()` sets a real title, description, og:title, og:description, twitter:card. og:image derived from generated hero image.

## Booking behavior (this pass)

All booking CTAs and per-class "Book" buttons are static placeholders: they smooth-scroll to the schedule section (hero primary and footer CTA) or open a small "Booking coming soon" state (per-class). Structured so a Calendly/Cal.com URL can be dropped into one `BOOKING_URL` constant later.

## Data

- Weekly schedule hardcoded in `src/data/schedule.ts` as a typed array (day, time, name, focus, location, duration, availability). Easy to edit.
- Testimonials + logistics content in `src/data/site.ts`.

## Images

Generated with `imagegen` into `src/assets/`:
- Hero: Alex mid-session, studio, moody warm light.
- Coach portrait.
- Studio interior (clean, structured, minimal equipment).
- Outdoor training (Barcelona park / beach / urban steps) — 2 images.
- Community strip: 3 small candid training shots.

All imported as ES modules, `loading="lazy"` except hero, explicit `width`/`height`, descriptive `alt`.

## Components

Small, focused components under `src/components/site/`:
- `TopBar`, `Hero`, `ScheduleGrid`, `ScheduleSlot`, `CoachTrust`, `Testimonials`, `Logistics`, `FinalCTA`, `SiteFooter`.

## Design tokens

Update `src/styles.css` `:root` (dark by default — no theme toggle):
- `--background: oklch(...)` ≈ `#0a0b0d`
- `--card: oklch(...)` ≈ `#141619`
- `--border: oklch(...)` ≈ `#2a2d33`
- `--primary: oklch(...)` ≈ `#ff5b14` (ember)
- `--primary-foreground`: near-white
- Muted foreground: neutral gray for supporting copy.

All colors used through semantic tokens; no hardcoded hex in components.

## Out of scope (per brief)

No pricing, no forms, no email capture, no blog, no motivational copy, no auth, no backend.

## Technical notes

- TanStack Start, single route file, no new dependencies required beyond what's installed.
- Mobile-first Tailwind, then `sm:`/`md:`/`lg:` upgrades.
- Set preview viewport to mobile during build since the brief is mobile-first.
