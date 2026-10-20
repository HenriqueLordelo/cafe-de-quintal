import type { FC, ReactNode } from "react";

import { ArrowUpRight } from "lucide-react";
import MenuCard from "@/components/landing/menu-card";
import Reveal from "@/components/landing/reveal";
import SectionHeading from "@/components/landing/section-heading";
import { useSite } from "@/components/landing/site-provider";

const MenuSection: FC = (): ReactNode => {
  const { brand } = useSite();

  return (
    <section
      id="menu"
      aria-labelledby="menu-title"
      className="bg-background py-24 text-cream lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="menu-title"
            eyebrow="The menu"
            title={brand.menu.title}
            description={brand.menu.description}
          />

          <Reveal delay={350} className="shrink-0">
            <a
              href="#hero"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-cream/15 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema"
            >
              Spin the flavor wheel
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brand.flavors.map((flavor, index) => (
            <Reveal
              key={flavor.id}
              as="li"
              variant="image"
              delay={(index % 3) * 110}
            >
              <MenuCard flavor={flavor} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 grid gap-8 rounded-[1.75rem] border border-cream/10 bg-cream/[0.03] p-6 sm:grid-cols-3 sm:p-8 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:items-center">
          <div className="sm:col-span-3 lg:col-span-1">
            <h3 className="font-heading font-soft text-2xl font-medium tracking-[-0.02em]">
              Make it yours
            </h3>

            <p className="mt-2 text-sm text-cream/60">
              Every swap is free. Just ask when you order.
            </p>
          </div>

          {brand.options.map((option) => (
            <div key={option.label}>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cream/45">
                {option.label}
              </p>

              <p className="mt-2 text-sm text-cream/85">
                {option.values.join(", ")}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default MenuSection;
