import type { CSSProperties, FC, ReactNode } from "react";

import Reveal from "@/components/landing/reveal";
import SectionHeading from "@/components/landing/section-heading";
import { useSite } from "@/components/landing/site-provider";

const OriginsSection: FC = (): ReactNode => {
  const { brand } = useSite();
  const OriginIcon = brand.originIcon;

  return (
    <section
      id="origins"
      aria-labelledby="origins-title"
      className="bg-background py-24 text-cream lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="origins-title"
          eyebrow="Where it grows"
          title={brand.origins.title}
          description={brand.origins.description}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {brand.origins.items.map((origin, index) => (
            <Reveal
              key={origin.region}
              as="article"
              delay={index * 140}
              aria-labelledby={`origin-${origin.region.toLowerCase()}`}
              className="kuro-contours relative flex flex-col overflow-hidden rounded-[1.75rem] border border-cream/10 bg-roast p-7 sm:p-10"
              style={{ "--contour-at": origin.contourAt } as CSSProperties}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-crema">
                    {origin.share}
                  </p>

                  <h3
                    id={`origin-${origin.region.toLowerCase()}`}
                    className="mt-3 font-heading font-soft text-4xl font-medium tracking-[-0.03em] sm:text-5xl"
                  >
                    {origin.region}
                  </h3>

                  <p className="mt-1 text-cream/60">{origin.country}</p>
                </div>

                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-cream/15 bg-espresso/60">
                  <OriginIcon aria-hidden className="size-5 text-crema" />
                </span>
              </div>

              <p className="mt-8 max-w-md text-sm leading-relaxed text-cream/75 sm:text-base">
                {origin.description}
              </p>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-cream/10 pt-6">
                {origin.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cream/45">
                      {fact.label}
                    </dt>

                    <dd className="mt-1.5 text-sm font-medium text-cream">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OriginsSection;
