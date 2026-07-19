import { BookButton } from "./BookButton";

export function FinalCTA() {
  return (
    <section id="final-cta" className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, oklch(0.70 0.19 42 / 0.18) 0%, transparent 55%), radial-gradient(ellipse at 90% 80%, oklch(0.70 0.19 42 / 0.10) 0%, transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="max-w-3xl">
          <div className="eyebrow text-primary">Take the slot</div>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-semibold sm:text-6xl">
            The best time to start<br />
            was last week.<br />
            <span className="text-muted-foreground">The next best is now.</span>
          </h2>
          <div className="mt-10">
            <BookButton size="lg">Book Your Session</BookButton>
          </div>
        </div>
      </div>
    </section>
  );
}
