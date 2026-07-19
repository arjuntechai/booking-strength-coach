import c1 from "@/assets/community-1.jpg";
import c2 from "@/assets/community-2.jpg";
import c3 from "@/assets/community-3.jpg";
import { TESTIMONIALS } from "@/data/site";

export function Testimonials() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <div className="eyebrow">Trained with Alex</div>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            In their words.
          </h2>
        </div>

        <div className="mt-12 grid gap-0 border-t border-border md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="border-b border-border py-8 md:border-b-0 md:border-r md:py-10 md:pr-8 md:last:border-r-0 md:[&:not(:first-child)]:pl-8"
            >
              <blockquote className="font-display text-lg leading-snug text-foreground">
                <span className="text-primary">“</span>
                {t.quote}
                <span className="text-primary">”</span>
              </blockquote>
              <figcaption className="mt-4 text-xs tracking-wider uppercase text-muted-foreground">
                {t.name}, {t.age} · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-3 gap-3">
          {[c1, c2, c3].map((src, i) => (
            <figure key={i} className="aspect-[3/4] overflow-hidden rounded-md border border-border">
              <img
                src={src}
                alt=""
                width={900}
                height={1100}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
