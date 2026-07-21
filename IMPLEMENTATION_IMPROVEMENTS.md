# Frontend Implementation Plan — Alex Moreno S&C

Tracking document for all frontend-only improvements identified in the site review. No backend work required for any item below unless noted as optional future integration.

**Scope:** UI, UX, content layout, accessibility, SEO meta, and client-side interactions only.

**Out of scope (for now):** Calendly/Cal.com integration, payment, auth, CMS, API-backed availability.

---

## How to use this doc

- Check boxes as work is completed: `- [ ]` → `- [x]`
- Each phase has a **Phase gate** checklist — finish the gate before moving on if you want a stable release at each milestone
- File/component hints are suggestions, not rigid requirements
- Copy changes can live in `src/data/site.ts` and `src/data/schedule.ts` where possible

---

## Current baseline

| Area | Status |
|------|--------|
| Single-page layout (Hero → Schedule → Coach → Testimonials → Logistics → CTA) | Done |
| Midnight & Ember design system | Done |
| Static schedule data | Done |
| Book buttons scroll to `#schedule` | Done |
| Slot "Book" scrolls to `#final-cta` | Done |

---

## Phase 1 — Quick wins

Low effort, high polish. Target: navigation, schedule defaults, a11y fixes, shareability.

### 1.1 Header navigation & scroll-spy

**Goal:** Users can orient and jump between sections on a long page.

**Files likely touched:** `src/components/site/TopBar.tsx`, possibly a new `src/hooks/use-scroll-spy.ts` or inline logic in TopBar.

- [x] Add anchor links in TopBar: Schedule (`#schedule`), Coach (`#coach`), Logistics (add `id="logistics"` to Logistics section)
- [x] Keep "Book" as primary CTA on the right (unchanged behavior for now)
- [x] On mobile: show condensed nav (e.g. hide middle links below `sm`, or use a minimal horizontal scroll / "Sections" dropdown)
- [x] Implement scroll-spy: highlight active nav item based on viewport section
- [x] Ensure sticky header offset so anchored sections aren't hidden under TopBar (`scroll-margin-top` on section ids)
- [x] Smooth scroll for in-page links (respect reduced motion — see Phase 1.3)

**Acceptance criteria:**
- [x] All nav links scroll to the correct section
- [x] Active section is visually indicated in the header while scrolling
- [x] Layout doesn't break at 320px width

---

### 1.2 Schedule UX defaults & mobile copy

**Goal:** Schedule feels contextual, not generic.

**Files likely touched:** `src/components/site/ScheduleGrid.tsx`, `src/data/schedule.ts` (if helper for "today").

- [x] Default active day tab to current weekday (Mon–Sat mapping)
- [x] If today is Sunday (no sessions), default to Monday or next day with open slots
- [x] Add subtle "Today" indicator on the active tab when it matches the current day
- [x] Show "Times shown in local Barcelona time" on mobile (remove `hidden sm:block` restriction or duplicate for small screens)
- [x] Verify day tab horizontal scroll + snap still works after changes

**Acceptance criteria:**
- [x] Opening the page on a weekday lands on that day's tab
- [x] Timezone note visible on all breakpoints

---

### 1.3 Accessibility quick fixes

**Goal:** Fix known a11y gaps without a full audit.

**Files likely touched:** `src/components/site/ScheduleGrid.tsx`, `src/components/site/Testimonials.tsx`, `src/components/site/SiteFooter.tsx`, `src/components/site/Hero.tsx`, `src/components/site/BookButton.tsx`, `src/routes/index.tsx` or `__root.tsx`.

- [x] Add skip link: "Skip to schedule" (or "Skip to main content") as first focusable element
- [x] Complete tabs pattern in ScheduleGrid:
  - [x] `aria-controls` on each tab pointing to tabpanel id
  - [x] `role="tabpanel"` on slot list container
  - [x] `id` on tabpanel tied to active tab
- [x] Testimonial/community images: add descriptive `alt` text OR mark decorative with empty alt only when adjacent text fully describes context
- [x] Replace footer Instagram `href="#"` with real URL or remove link until URL exists
- [x] Add `prefers-reduced-motion` handling: disable smooth scroll when user prefers reduced motion
- [x] Extend consistent `focus-visible` rings to day tabs and schedule row buttons (match BookButton style)

**Acceptance criteria:**
- [x] Keyboard-only user can reach schedule via skip link
- [x] Tab key navigates tabs with visible focus
- [x] No placeholder `href="#"` social links remain

---

### 1.4 SEO & shareability meta

**Goal:** Link previews and browser chrome look professional.

**Files likely touched:** `src/routes/index.tsx`, `src/routes/__root.tsx`, `public/` assets.

- [x] Add `og:image` (hero or coach portrait — 1200×630 recommended)
- [x] Add `twitter:image` if using summary_large_image
- [x] Add favicon set: `favicon.ico`, optional `apple-touch-icon.png`
- [x] Add canonical URL meta when production domain is known (placeholder ok until deploy)
- [x] Verify page title and description aren't duplicated/conflicting between root and index route

**Acceptance criteria:**
- [ ] Sharing link in iMessage/WhatsApp/Slack shows image + title + description
- [x] Browser tab shows favicon

---

### Phase 1 gate

- [ ] All Phase 1 sections above checked off
- [ ] Manual smoke test on mobile + desktop
- [ ] No new console errors or broken anchors

---

## Phase 2 — Conversion & booking clarity

Target: reduce confusion around CTAs and improve lead quality.

### 2.1 CTA labeling & hierarchy

**Goal:** Each button's intent is obvious.

**Files likely touched:** `src/components/site/Hero.tsx`, `src/components/site/TopBar.tsx`, `src/components/site/FinalCTA.tsx`, `src/components/site/BookButton.tsx`.

- [ ] Audit all "Book" labels and assign distinct roles:
  - [ ] Hero primary: e.g. "Book a session" → scroll to schedule or final CTA (pick one consistent target)
  - [ ] Hero secondary: "View schedule" (already exists — keep)
  - [ ] TopBar: short "Book" ok, or "Book session"
  - [ ] Final CTA: "Book your session" (already close — align wording site-wide)
- [ ] Document chosen scroll targets in a comment in `src/data/site.ts` (e.g. `BOOKING_URL` semantics)
- [ ] Ensure TopBar + Hero CTAs don't fight each other visually (one primary orange, rest secondary/ghost)

**Acceptance criteria:**
- [ ] User can articulate what each CTA does without guessing
- [ ] Wording is consistent across breakpoints

---

### 2.2 Slot → booking context (client-side state)

**Goal:** Clicking a specific slot feels like starting a booking, not a random scroll.

**Files likely touched:** `src/components/site/ScheduleGrid.tsx`, `src/components/site/FinalCTA.tsx`, optional `src/context/BookingContext.tsx` or lifted state in `index.tsx`.

- [ ] On slot "Book" click, store selected slot in React state (id, day, time, name, location)
- [ ] Scroll to `#final-cta` after selection
- [ ] Display selection banner in FinalCTA: e.g. "You're booking: Tue 18:00 — Strength Block (Studio)"
- [ ] Clear selection option ("Choose a different slot" → scroll back to `#schedule`)
- [ ] Optional: brief highlight animation on selected row in schedule
- [ ] Full slots: replace disabled "Waitlist" button with actionable secondary CTA (`mailto:` or modal UI — see 2.4)

**Acceptance criteria:**
- [ ] Selecting a slot shows its name/time in the final CTA section
- [ ] Refreshing page clears selection (sessionStorage optional later)

---

### 2.3 "How it works" section (3 steps)

**Goal:** Reduce friction between hero and schedule.

**Files likely touched:** new `src/components/site/HowItWorks.tsx`, `src/routes/index.tsx`, optional copy in `src/data/site.ts`.

- [ ] Create 3-step strip between Hero and ScheduleGrid
- [ ] Steps (suggested):
  1. Pick a slot from the weekly schedule
  2. Show up ready (link mentally to Logistics "Bring" row)
  3. Train with structured programming
- [ ] Match existing design language: eyebrow, display heading, minimal icons or numerals
- [ ] Mobile: stack vertically; desktop: 3-column grid
- [ ] Add to page flow in `index.tsx`

**Acceptance criteria:**
- [ ] Section visible without scrolling on large viewports (below hero fold ok)
- [ ] Copy is scannable in under 10 seconds

---

### 2.4 Pricing hint

**Goal:** Set expectations without building checkout.

**Files likely touched:** `src/data/site.ts`, `src/components/site/Hero.tsx` and/or new `PricingHint.tsx`, optionally FinalCTA.

- [ ] Add pricing copy to data file (e.g. `PRICING = { intro: "...", note: "..." }`)
- [ ] Display one line near hero CTA: e.g. "Intro session from €X" or "Sessions from €X — packages available"
- [ ] Optional: expand into small pricing card in Logistics or dedicated subsection
- [ ] Use placeholder € values until real pricing confirmed

**Acceptance criteria:**
- [ ] Pricing visible above the fold or within first two screenfuls on mobile
- [ ] Copy doesn't imply online payment (booking enquiry only)

---

### 2.5 Mobile sticky CTA bar

**Goal:** Booking action always reachable on long mobile scroll.

**Files likely touched:** new `src/components/site/MobileStickyCTA.tsx`, `src/hooks/use-mobile.tsx`, `index.tsx`.

- [ ] Show fixed bottom bar on mobile after user scrolls past hero
- [ ] Single primary action: "Book session" (scroll to schedule or final CTA — match 2.1 decision)
- [ ] Hide when FinalCTA is in viewport (avoid duplicate CTAs)
- [ ] Respect safe-area-inset for notched phones
- [ ] Ensure bar doesn't cover footer content (padding-bottom on main optional)

**Acceptance criteria:**
- [ ] Bar appears/disappears at sensible scroll positions
- [ ] Doesn't overlap iOS home indicator awkwardly

---

### 2.6 Waitlist UX for full slots

**Goal:** Full slots still capture interest.

**Files likely touched:** `src/components/site/ScheduleGrid.tsx`, optional simple modal using existing `dialog.tsx`.

- [ ] Change full-slot UI from disabled button to secondary "Join waitlist" action
- [ ] Frontend-only v1: `mailto:` with pre-filled subject/body including slot name
- [ ] Optional v2: modal with name/email fields (UI only — submit via mailto or static message "We'll be in touch")

**Acceptance criteria:**
- [ ] Full slots have a clear, clickable waitlist path
- [ ] Pre-filled message includes slot day/time/name

---

### Phase 2 gate

- [ ] All Phase 2 sections above checked off
- [ ] Walk through full booking path on mobile: hero → pick slot → final CTA
- [ ] CTA wording reviewed for consistency

---

## Phase 3 — Trust, content depth & schedule power

Target: answer objections and make schedule more useful.

### 3.1 Trust badges & stats bar

**Goal:** Credentials visible at a glance, not only in bullet copy.

**Files likely touched:** `src/data/site.ts`, `src/components/site/CoachTrust.tsx`, optional new `StatsBar.tsx` under Hero.

- [ ] Extract trust facts into data: years, certification (NSCA-CSCS), cities, optional client count
- [ ] Add visual badges/chips in CoachTrust (certification, years)
- [ ] Optional horizontal stats bar below Hero: "12+ years · NSCA-CSCS · Barcelona & London"
- [ ] Keep tone factual, not salesy

**Acceptance criteria:**
- [ ] Certification visible without reading full paragraph
- [ ] Stats bar responsive (wrap or scroll on narrow screens)

---

### 3.2 Testimonials ↔ photos pairing

**Goal:** Quotes feel tied to real people/sessions.

**Files likely touched:** `src/data/site.ts`, `src/components/site/Testimonials.tsx`.

- [ ] Extend testimonial data with optional `image` field
- [ ] Pair each quote with one community photo (avatar or card layout)
- [ ] Layout options (pick one):
  - [ ] Card: photo top, quote below, attribution bottom
  - [ ] Side-by-side on desktop, stacked on mobile
- [ ] Fix all image alt text meaningfully

**Acceptance criteria:**
- [ ] Three testimonials each have a visual anchor
- [ ] Grid doesn't break with varying quote lengths

---

### 3.3 "Who it's for / not for" prominence

**Goal:** Strong differentiator copy is easier to find.

**Files likely touched:** `src/components/site/Logistics.tsx`, optional new `FitSection.tsx`, `index.tsx`.

- [ ] Option A: Pull FIT block out of Logistics into its own section with `id="fit"`
- [ ] Option B: Duplicate short summary near Coach or HowItWorks with "Learn more" anchor to Logistics
- [ ] Add nav link if new section gets its own id
- [ ] Keep "not for" list visually de-emphasized (muted) vs "for" list (primary accent)

**Acceptance criteria:**
- [ ] FIT content reachable within two clicks from header or hero
- [ ] "Not for" list still feels honest, not harsh

---

### 3.4 FAQ section

**Goal:** Answer common objections statically.

**Files likely touched:** new `src/components/site/FAQ.tsx`, `src/data/site.ts`, `index.tsx`, existing `accordion.tsx`.

- [ ] Add FAQ data array (question + answer) — suggest 5–7 items:
  - [ ] Do I need gym experience?
  - [ ] Studio vs outdoor — which should I pick?
  - [ ] What if I travel frequently?
  - [ ] How long are sessions?
  - [ ] What should I bring?
  - [ ] Cancellation / rescheduling policy (placeholder copy)
- [ ] Render with Accordion component
- [ ] Place before FinalCTA or after Logistics
- [ ] Optional: add FAQ to header nav

**Acceptance criteria:**
- [ ] Accordion keyboard accessible (Radix defaults)
- [ ] Only one or multiple open — pick behavior and stay consistent

---

### 3.5 First session / what to expect

**Goal:** Reduce anxiety for new clients.

**Files likely touched:** new `src/components/site/FirstSession.tsx` or merge into HowItWorks/FAQ, `src/data/site.ts`.

- [ ] Short section: what happens in session 1 (assessment, movement screen, plan overview)
- [ ] Bullet timeline or 4-step vertical list
- [ ] Cross-link to Logistics "Bring" and session length
- [ ] Place near Coach or FAQ

**Acceptance criteria:**
- [ ] Readable in under 30 seconds
- [ ] No duplicate overlap with HowItWorks (complementary, not repetitive)

---

### 3.6 Location / map

**Goal:** Poblenou base feels real and findable.

**Files likely touched:** new `src/components/site/Location.tsx` or extend Logistics, `src/data/site.ts`.

- [ ] Add static map embed (Google Maps iframe) OR styled static map image with link to Maps
- [ ] List outdoor spots already in LOGISTICS — optional icons or mini list with short descriptors
- [ ] Lazy-load embed for performance
- [ ] Privacy-friendly placeholder if embed deferred

**Acceptance criteria:**
- [ ] User can open directions in Maps in one tap
- [ ] Map doesn't hurt mobile performance noticeably

---

### 3.7 Schedule filters (client-side)

**Goal:** Help users find the right session type quickly.

**Files likely touched:** `src/components/site/ScheduleGrid.tsx`, `src/data/schedule.ts`.

- [ ] Add filter chips: All · Studio · Outdoor
- [ ] Optional second axis: Strength · Conditioning · Mobility (or combine into one filter row)
- [ ] Filter applies to current day tab's slot list
- [ ] Empty state when no slots match: "No outdoor sessions on this day — try Wed or Fri"
- [ ] Preserve selected slot booking context when filtering (Phase 2.2)

**Acceptance criteria:**
- [ ] Filters work in combination with day tabs
- [ ] Filter state clears or persists intentionally on day change (document choice)

---

### 3.8 Schedule enhancements (optional)

**Goal:** Richer schedule UX without live availability API.

**Files likely touched:** `src/components/site/ScheduleGrid.tsx`, `src/data/schedule.ts`.

- [ ] Week-at-a-glance row: dot per day showing open / limited / full summary
- [ ] Expandable slot rows: tap to show static description + outdoor meeting point
- [ ] "Few spots" subtle urgency badge (no animation spam — static badge ok)
- [ ] Saturday sparse state: "Private slots available on request" with mailto CTA

**Acceptance criteria:**
- [ ] Week summary accurate from static SCHEDULE data
- [ ] Expanded row content keyed by slot id in data file

---

### Phase 3 gate

- [ ] All Phase 3 sections above checked off
- [ ] Content review: no placeholder emails/URLs left (`hello@example.com`, `#`)
- [ ] Full page read-through for duplicate copy

---

## Phase 4 — Visual polish & micro-interactions

Target: refinement without changing brand direction. **Use sparingly.**

### 4.1 Section layout variety

**Goal:** Avoid repetitive eyebrow + h2 + grid rhythm.

**Files likely touched:** various `src/components/site/*.tsx`.

- [ ] Identify 1–2 sections to differentiate (e.g. full-bleed image band in Testimonials or Logistics)
- [ ] Optional asymmetric grid in CoachTrust on large screens
- [ ] Final CTA: add supporting line under button — e.g. "No commitment on first enquiry" or "Reply within 24h"

**Acceptance criteria:**
- [ ] Page scan feels varied but still one cohesive brand
- [ ] No layout shifts that hurt CLS

---

### 4.2 Hero visual treatment

**Goal:** Hero has more depth without clutter.

**Files likely touched:** `src/components/site/Hero.tsx`, `src/styles.css`.

- [ ] Optional subtle grain/noise overlay on hero image
- [ ] Review gradient stops for readability on bright image areas
- [ ] Verify hero image `object-position` on common phone aspect ratios

**Acceptance criteria:**
- [ ] Headline contrast passes casual readability check on mobile outdoors brightness

---

### 4.3 Micro-interactions

**Goal:** Subtle life, not gym-bro hype.

**Files likely touched:** section components, `src/styles.css`, optional small hook with Intersection Observer.

- [ ] Section fade-in on first enter (once per page load, respect reduced motion)
- [ ] Schedule tab switch: crossfade slot list (optional)
- [ ] Hover: primary button arrow shift (partially exists on "View schedule" — extend consistently)
- [ ] **Do not add:** heavy parallax, autoplay video, aggressive countdown timers

**Acceptance criteria:**
- [ ] All animations disabled when `prefers-reduced-motion: reduce`
- [ ] No animation blocks interaction

---

### 4.4 Touch targets & mobile spacing

**Goal:** Meet mobile usability baselines.

**Files likely touched:** `ScheduleGrid.tsx`, `TopBar.tsx`, `BookButton.tsx`.

- [ ] Bump schedule row buttons to min 44×44px tap targets
- [ ] Audit spacing between interactive elements in schedule rows on mobile
- [ ] Test hero headline line breaks at 320px and 375px

**Acceptance criteria:**
- [ ] Apple HIG / WCAG touch target guidelines met for primary actions

---

### Phase 4 gate

- [ ] All Phase 4 sections above checked off
- [ ] Motion review with reduced-motion OS setting enabled
- [ ] Lighthouse mobile spot-check (performance + a11y)

---

## Phase 5 — SEO structured data & performance (frontend)

Target: discoverability and load quality.

### 5.1 JSON-LD structured data

**Files likely touched:** `src/routes/index.tsx` or small `src/components/site/StructuredData.tsx`.

- [ ] Add `Person` schema for Alex Moreno (name, jobTitle, areaServed, image)
- [ ] Add `LocalBusiness` or `SportsActivityLocation` (address area Poblenou, priceRange if pricing added)
- [ ] Validate with Google Rich Results Test after deploy

**Acceptance criteria:**
- [ ] JSON-LD validates without errors
- [ ] No duplicate conflicting entities

---

### 5.2 Image optimization

**Files likely touched:** `src/assets/*`, Vite config if needed, image components.

- [ ] Provide responsive images where practical (`srcset` / `sizes` for hero and coach portrait)
- [ ] Convert assets to WebP/AVIF with fallbacks if build pipeline supports it
- [ ] Hero: priority load (no lazy) — keep LCP fast
- [ ] Below-fold images: keep `loading="lazy"`

**Acceptance criteria:**
- [ ] LCP image loads promptly on 4G throttled test
- [ ] No obvious layout shift from image load

---

### 5.3 Font loading

**Files likely touched:** `src/routes/__root.tsx`, `src/styles.css`.

- [ ] Review Google Fonts loading (`display=swap` already in URL — verify)
- [ ] Optional: self-host Space Grotesk + Inter for privacy/perf
- [ ] Preload only critical weights (500–700 display, 400–600 sans)

**Acceptance criteria:**
- [ ] No FOIT flash on first load
- [ ] Fonts render consistently on slow network

---

### Phase 5 gate

- [ ] Structured data live
- [ ] Image/font strategy documented in this file or PR description
- [ ] Production build preview checked

---

## Deferred / optional (not in current scope)

Items mentioned in review but intentionally parked:

| Item | Why deferred |
|------|----------------|
| Calendly / Cal.com URL swap | Backend/integration decision |
| i18n (Catalan / Spanish) | Content + routing scope |
| Light mode theme | Brand decision — dark fits positioning |
| Instagram feed embed | Needs live account + embed policy |
| Contact form with server submit | Backend required |
| sessionStorage for slot selection persistence | Nice-to-have after Phase 2.2 |
| TopBar hide-on-scroll | Polish — Phase 4 optional |

---

## Suggested page order (after all sections added)

Reference layout when inserting new components in `src/routes/index.tsx`:

1. TopBar
2. Hero
3. Stats bar *(Phase 3.1, optional)*
4. How it works *(Phase 2.3)*
5. Schedule
6. Coach trust
7. Testimonials
8. Fit section *(Phase 3.3, if split out)*
9. Logistics
10. Location / map *(Phase 3.6)*
11. First session *(Phase 3.5)*
12. FAQ *(Phase 3.4)*
13. Final CTA
14. SiteFooter
15. Mobile sticky CTA *(Phase 2.5, fixed position)*

---

## Master progress tracker

### Phase 1 — Quick wins
- [x] 1.1 Header navigation & scroll-spy
- [x] 1.2 Schedule UX defaults & mobile copy
- [x] 1.3 Accessibility quick fixes
- [x] 1.4 SEO & shareability meta
- [ ] Phase 1 gate

### Phase 2 — Conversion & booking clarity
- [ ] 2.1 CTA labeling & hierarchy
- [ ] 2.2 Slot → booking context
- [ ] 2.3 How it works section
- [ ] 2.4 Pricing hint
- [ ] 2.5 Mobile sticky CTA bar
- [ ] 2.6 Waitlist UX for full slots
- [ ] Phase 2 gate

### Phase 3 — Trust, content depth & schedule power
- [ ] 3.1 Trust badges & stats bar
- [ ] 3.2 Testimonials ↔ photos pairing
- [ ] 3.3 Who it's for / not for prominence
- [ ] 3.4 FAQ section
- [ ] 3.5 First session / what to expect
- [ ] 3.6 Location / map
- [ ] 3.7 Schedule filters
- [ ] 3.8 Schedule enhancements (optional)
- [ ] Phase 3 gate

### Phase 4 — Visual polish & micro-interactions
- [ ] 4.1 Section layout variety
- [ ] 4.2 Hero visual treatment
- [ ] 4.3 Micro-interactions
- [ ] 4.4 Touch targets & mobile spacing
- [ ] Phase 4 gate

### Phase 5 — SEO structured data & performance
- [ ] 5.1 JSON-LD structured data
- [ ] 5.2 Image optimization
- [ ] 5.3 Font loading
- [ ] Phase 5 gate

---

## Pre-launch checklist (final)

- [ ] Replace all placeholder copy (`hello@example.com`, example pricing, `#` links)
- [ ] Real `BOOKING_URL` or confirmed scroll-only booking flow
- [ ] og:image and favicon on production URL
- [ ] Manual test: iPhone Safari, Android Chrome, desktop Chrome/Firefox
- [ ] Keyboard navigation full pass
- [ ] Reduced motion pass
- [ ] Share link preview test in one messenger app

---

*Last updated: 2026-07-21 — created from frontend review brainstorm.*
