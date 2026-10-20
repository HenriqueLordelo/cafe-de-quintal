import type { FC, ReactNode } from "react";

import Image from "next/image";
import Reveal from "@/components/landing/reveal";
import SectionHeading from "@/components/landing/section-heading";
import { useSite } from "@/components/landing/site-provider";

const ProcessSection: FC = (): ReactNode => {
  const { brand } = useSite();

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="bg-cream py-24 text-espresso lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          onCream
          id="process-title"
          eyebrow="How it's made"
          title={brand.process.title}
        />

        <ol className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {brand.process.steps.map((step, index) => (
            <Reveal
              key={`${brand.id}-${step.title}`}
              as="li"
              variant="image"
              delay={index * 120}
              className="flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_60px_-40px_rgb(0_0_0/0.4)]">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="kuro-reveal-media object-cover"
                />

                <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-espresso text-sm font-semibold tabular-nums text-cream">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-6 font-heading font-soft text-2xl font-medium tracking-[-0.02em]">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-espresso/70 sm:text-base">
                {step.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
