import type { FC, ReactNode } from "react";
import type { Flavor } from "@/types";

import { Check } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import IngredientTile from "@/components/landing/ingredient-tile";

interface FlavorsPanelProps {
  flavors: Flavor[];
  activeIndex: number;
  onPick: (index: number) => void;
}

const FlavorsPanel: FC<FlavorsPanelProps> = ({
  flavors,
  activeIndex,
  onPick,
}): ReactNode => {
  return (
    <>
      <p className="px-3 pb-2 pt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cream/50">
        All flavors
      </p>

      <ul className="flex flex-col gap-0.5">
        {flavors.map((flavor, index) => {
          const isActive = index === activeIndex;

          return (
            <li key={flavor.id}>
              <button
                type="button"
                onClick={() => onPick(index)}
                aria-current={isActive ? "true" : undefined}
                className="flex w-full cursor-pointer items-center gap-3 rounded-2xl p-2 text-left transition-colors hover:bg-cream/[0.06] focus-visible:outline-2 focus-visible:outline-crema aria-[current=true]:bg-cream/10"
              >
                <IngredientTile
                  flavor={flavor}
                  className="size-11 shrink-0 rounded-xl"
                />

                <span className="min-w-0 flex-1">
                  <span className="block font-heading font-soft text-[0.9375rem] font-medium leading-tight text-cream">
                    {flavor.title}
                  </span>

                  <span className="mt-0.5 block truncate text-xs text-cream/55">
                    {flavor.notes.join(", ")}
                  </span>
                </span>

                <span className="shrink-0 text-sm font-semibold tabular-nums text-cream/85">
                  {formatPrice(flavor.price)}
                </span>

                <Check
                  aria-hidden
                  className={cn(
                    "size-4 shrink-0 text-crema",
                    !isActive && "invisible",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FlavorsPanel;
