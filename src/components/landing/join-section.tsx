import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";
import IngredientTile from "@/components/landing/ingredient-tile";
import JoinForm from "@/components/landing/join-form";
import Reveal from "@/components/landing/reveal";
import RevealText from "@/components/landing/reveal-text";
import { useSite } from "@/components/landing/site-provider";

/* `index` points into the active menu's flavor list. */
const DECOR = [
  {
    index: 1,
    className: "left-6 top-0 size-32 -rotate-12",
    float: "0s",
    reveal: 300,
  },
  {
    index: 2,
    className: "right-0 top-14 size-36 rotate-[9deg]",
    float: "-2.4s",
    reveal: 450,
  },
  {
    index: 4,
    className: "bottom-0 left-24 size-28 rotate-6",
    float: "-4.8s",
    reveal: 600,
  },
];

const JoinSection: FC = (): ReactNode => {
  const { brand } = useSite();

  return (
    <section
      id="join"
      aria-labelledby="join-title"
      className="bg-background px-3 pb-24 sm:px-6 lg:pb-32"
    >
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-crema px-6 py-16 text-espresso sm:px-12 sm:py-20 lg:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute right-12 top-1/2 hidden h-80 w-96 -translate-y-1/2 lg:block xl:right-24"
        >
          {DECOR.map((item) => {
            const flavor = brand.flavors[item.index];

            if (!flavor) return null;

            return (
              <Reveal
                key={flavor.id}
                delay={item.reveal}
                className={cn("absolute", item.className)}
              >
                <span
                  className="kuro-float block size-full"
                  style={{ animationDelay: item.float }}
                >
                  <IngredientTile
                    flavor={flavor}
                    className="size-full rounded-[24%] shadow-[0_30px_50px_-24px_rgb(0_0_0/0.45)] ring-1 ring-black/10"
                  />
                </span>
              </Reveal>
            );
          })}
        </div>

        <div className="relative max-w-xl">
          <Reveal
            as="p"
            delay={100}
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-espresso/60"
          >
            Join the list
          </Reveal>

          <h2
            id="join-title"
            className="mt-4 text-balance font-heading font-soft text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.03em]"
          >
            <RevealText text="Be first to taste what's next." delay={180} />
          </h2>

          <Reveal
            as="p"
            delay={360}
            className="mt-5 text-base leading-relaxed text-espresso/75 sm:text-lg"
          >
            New flavors land every season. Leave your email and we&apos;ll tell
            you the day they reach the menu.
          </Reveal>

          <Reveal delay={480}>
            <JoinForm />
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
};

export default JoinSection;
