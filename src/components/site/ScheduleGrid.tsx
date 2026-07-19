import { useState } from "react";
import { DAYS, SCHEDULE, type Slot } from "@/data/schedule";

function AvailabilityDot({ status }: { status: Slot["availability"] }) {
  const map: Record<Slot["availability"], { dot: string; label: string }> = {
    open:    { dot: "bg-primary",              label: "Open" },
    limited: { dot: "bg-primary/60 ring-1 ring-primary/40", label: "Few spots" },
    full:    { dot: "bg-muted-foreground/40",  label: "Full" },
  };
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-1.5 w-1.5 rounded-full ${map[status].dot}`} aria-hidden />
      <span className={status === "full" ? "text-muted-foreground" : "text-foreground/85"}>
        {map[status].label}
      </span>
    </span>
  );
}

function SlotRow({ slot }: { slot: Slot }) {
  const full = slot.availability === "full";
  return (
    <div className="group grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4 border-b border-border/70 py-4 last:border-b-0 sm:grid-cols-[80px_minmax(0,1fr)_auto_auto] sm:gap-6">
      <div className="font-display text-lg font-semibold tabular-nums text-foreground">
        {slot.time}
      </div>
      <div className="min-w-0">
        <div className="truncate font-display text-base font-medium text-foreground">
          {slot.name}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span>{slot.focus}</span>
          <span aria-hidden>·</span>
          <span className={slot.location === "Outdoor" ? "text-primary/90" : ""}>
            {slot.location}
          </span>
          <span aria-hidden>·</span>
          <span>{slot.duration}</span>
        </div>
      </div>
      <div className="hidden text-xs sm:block">
        <AvailabilityDot status={slot.availability} />
      </div>
      <button
        type="button"
        disabled={full}
        onClick={() => {
          if (!full) {
            const el = document.getElementById("final-cta");
            el?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className={
          full
            ? "inline-flex h-9 items-center justify-center rounded-sm border border-border/60 px-3 text-xs text-muted-foreground"
            : "inline-flex h-9 items-center justify-center rounded-sm border border-primary/60 px-3 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        }
      >
        {full ? "Waitlist" : "Book"}
      </button>
      <div className="col-span-3 -mt-2 sm:hidden">
        <AvailabilityDot status={slot.availability} />
      </div>
    </div>
  );
}

export function ScheduleGrid() {
  const [activeDay, setActiveDay] = useState<Slot["day"]>("Mon");
  const daySlots = SCHEDULE.filter((s) => s.day === activeDay);

  return (
    <section id="schedule" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
          <div className="min-w-0">
            <div className="eyebrow">The week</div>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Schedule
            </h2>
          </div>
          <div className="hidden text-right text-xs text-muted-foreground sm:block">
            Times shown in local Barcelona time
          </div>
        </div>

        {/* Day tabs */}
        <div
          role="tablist"
          className="mt-8 -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
        >
          {DAYS.map((d) => {
            const active = d === activeDay;
            return (
              <button
                key={d}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveDay(d)}
                className={
                  "snap-start shrink-0 rounded-sm border px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors " +
                  (active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground")
                }
              >
                {d}
              </button>
            );
          })}
        </div>

        {/* Slots list */}
        <div className="mt-6 rounded-md border border-border bg-surface/50">
          <div className="flex items-center justify-between border-b border-border px-5 py-3 text-xs text-muted-foreground">
            <span className="font-medium tracking-wider uppercase text-foreground/70">
              {activeDay}
            </span>
            <span>{daySlots.length} sessions</span>
          </div>
          <div className="px-5">
            {daySlots.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No sessions scheduled.
              </div>
            ) : (
              daySlots.map((s) => <SlotRow key={s.id} slot={s} />)
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Open
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60 ring-1 ring-primary/40" /> Few spots
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" /> Full
          </span>
        </div>
      </div>
    </section>
  );
}
