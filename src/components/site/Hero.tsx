import heroImg from "@/assets/hero.jpg";
import { BookButton } from "./BookButton";

export function Hero() {
  const scrollToSchedule = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Coach mid-training with a barbell in a dark studio"
          width={1600}
          height={1200}
          className="h-full w-full object-cover object-[70%_center] opacity-55"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.14 0.006 260 / 0.95) 0%, oklch(0.14 0.006 260 / 0.75) 45%, oklch(0.14 0.006 260 / 0.35) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-24 sm:px-8 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Barcelona</span>
            <span className="h-px w-8 bg-border" aria-hidden />
            <span className="eyebrow">Studio · Outdoor</span>
          </div>

          <h1 className="mt-6 font-display text-[2.5rem] leading-[1.02] font-semibold sm:text-6xl lg:text-7xl">
            Get stronger.<br />
            <span className="text-muted-foreground">Train consistently.</span><br />
            <span className="text-primary">Move like it matters.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Private and small-group coaching for busy professionals. Structured strength and conditioning across the studio and Barcelona's parks and coastline.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <BookButton size="lg" />
            <a
              href="#schedule"
              onClick={scrollToSchedule}
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/90 hover:text-foreground"
            >
              View schedule
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
