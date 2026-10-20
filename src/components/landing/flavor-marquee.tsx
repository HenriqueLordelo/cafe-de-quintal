import type { FC, ReactNode } from "react";

import { useSite } from "@/components/landing/site-provider";

/* Four copies so half the strip is always wider than the screen. */
const COPIES = [0, 1, 2, 3];

const FlavorMarquee: FC = (): ReactNode => {
  const { brand } = useSite();
  const Mark = brand.markIcon;

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-espresso/10 bg-crema py-4 text-espresso sm:py-5"
    >
      <div className="kuro-marquee flex w-max">
        {COPIES.map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {brand.flavors.map((flavor) => (
              <li
                key={flavor.id}
                className="flex items-center gap-6 pr-6 font-heading font-soft text-2xl font-medium tracking-[-0.02em] whitespace-nowrap sm:text-3xl"
              >
                <span>{flavor.title}</span>
                <Mark className="size-5 text-espresso/45" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default FlavorMarquee;
