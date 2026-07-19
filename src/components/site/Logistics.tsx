import beachImg from "@/assets/outdoor-beach.jpg";
import { LOGISTICS, FIT } from "@/data/site";

export function Logistics() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <div className="eyebrow">The practical bit</div>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Logistics.
          </h2>
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-0 border-y border-border sm:grid-cols-2 lg:grid-cols-4">
          {LOGISTICS.map((row, i) => (
            <div
              key={i}
              className="border-border p-6 sm:[&:not(:nth-child(2n))]:border-r sm:[&:nth-child(1)]:border-b sm:[&:nth-child(2)]:border-b lg:[&:not(:nth-child(4))]:border-r lg:[&:nth-child(-n+4)]:border-b-0"
            >
              <dt className="eyebrow">{row.label}</dt>
              <dd className="mt-2 font-display text-lg text-foreground">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <div className="eyebrow text-primary">Who it's for</div>
              <ul className="mt-4 space-y-3">
                {FIT.for.map((f, i) => (
                  <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 text-sm leading-relaxed text-foreground/90">
                    <span className="mt-2 h-px w-4 bg-primary" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow">Who it's not</div>
              <ul className="mt-4 space-y-3">
                {FIT.notFor.map((f, i) => (
                  <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-px w-4 bg-border" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <figure className="aspect-[4/3] overflow-hidden rounded-md border border-border lg:aspect-auto">
            <img
              src={beachImg}
              alt="Outdoor training on Barceloneta beach"
              width={1400}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
