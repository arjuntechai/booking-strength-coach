import coachImg from "@/assets/coach.jpg";
import studioImg from "@/assets/studio.jpg";
import outdoorParkImg from "@/assets/outdoor-park.jpg";
import { COACH } from "@/data/site";

export function CoachTrust() {
  return (
    <section id="coach" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-md border border-border bg-surface">
              <img
                src={coachImg}
                alt="Portrait of Alex Moreno"
                width={1000}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 left-4 rounded-sm border border-border bg-background px-3 py-1.5 text-[0.7rem] font-medium tracking-wider uppercase text-muted-foreground">
              Coach
            </div>
          </div>

          <div>
            <div className="eyebrow">Who you'll train with</div>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              {COACH.name}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{COACH.role}</p>

            <ul className="mt-10 space-y-6">
              {COACH.bullets.map((b, i) => (
                <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                  <span className="mt-1 font-display text-sm tabular-nums text-primary">
                    0{i + 1}
                  </span>
                  <span className="text-base leading-relaxed text-foreground/90">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-2 gap-3">
              <figure className="aspect-[4/3] overflow-hidden rounded-md border border-border">
                <img
                  src={studioImg}
                  alt="Minimal training studio interior"
                  width={1400}
                  height={1000}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </figure>
              <figure className="aspect-[4/3] overflow-hidden rounded-md border border-border">
                <img
                  src={outdoorParkImg}
                  alt="Outdoor training in a Barcelona park"
                  width={1400}
                  height={1000}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
