import type { FC, ReactNode } from "react";

import Image from "next/image";
import Reveal from "@/components/landing/reveal";
import SectionHeading from "@/components/landing/section-heading";
import { useSite } from "@/components/landing/site-provider";

const StorySection: FC = (): ReactNode => {
  const { brand } = useSite();
  const { story } = brand;

  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="bg-cream text-espresso"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <Reveal variant="image" className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.4)]">
            <Image
              key={story.image}
              src={story.image}
              alt={story.imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="kuro-reveal-media object-cover"
            />
          </div>

          <Reveal
            delay={450}
            className="absolute -bottom-6 right-4 rounded-2xl bg-espresso px-5 py-4 text-cream shadow-[0_24px_50px_-20px_rgb(0_0_0/0.6)] sm:right-8"
          >
            <p className="font-heading font-soft text-3xl font-medium leading-none">
              {story.badgeValue}
            </p>

            <p className="mt-1.5 text-xs text-cream/65">{story.badgeLabel}</p>
          </Reveal>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading
            onCream
            id="story-title"
            eyebrow="Our story"
            title={story.title}
          />

          <div className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-espresso/75 sm:text-lg">
            {story.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} as="p" delay={200 + index * 120}>
                {paragraph}
              </Reveal>
            ))}
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-espresso/15 pt-8">
            {story.stats.map((stat, index) => (
              <Reveal
                key={`${brand.id}-${stat.label}`}
                delay={index * 120}
                className="flex flex-col-reverse gap-2"
              >
                <dt className="text-xs leading-snug text-espresso/65 sm:text-sm">
                  {stat.label}
                </dt>

                <dd className="font-heading font-soft text-4xl font-medium leading-none tracking-[-0.03em] sm:text-5xl">
                  {stat.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
