import type { FC, ReactNode } from "react";
import type { Bag, Flavor } from "@/types";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/format";
import IngredientTile from "@/components/landing/ingredient-tile";

interface BagPanelProps {
  flavors: Flavor[];
  bag: Bag;
  onChange: (id: string, delta: number) => void;
  onClear: () => void;
}

const stepperClassName =
  "grid size-8 cursor-pointer place-items-center rounded-full text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-crema";

const BagPanel: FC<BagPanelProps> = ({
  flavors,
  bag,
  onChange,
  onClear,
}): ReactNode => {
  const lines = flavors.filter((flavor) => (bag[flavor.id] ?? 0) > 0);
  const count = lines.reduce((sum, flavor) => sum + bag[flavor.id], 0);
  const subtotal = lines.reduce(
    (sum, flavor) => sum + bag[flavor.id] * flavor.price,
    0,
  );

  return (
    <>
      <div className="flex items-center justify-between px-3 pb-2 pt-2">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cream/50">
          Your bag
        </p>

        {count > 0 && (
          <p className="text-xs text-cream/55">
            {count} {count === 1 ? "drink" : "drinks"}
          </p>
        )}
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center px-6 pb-6 pt-3 text-center">
          <span className="grid size-12 place-items-center rounded-2xl bg-cream/5 text-cream/60">
            <ShoppingBag aria-hidden className="size-5" />
          </span>

          <p className="mt-3 font-heading font-soft text-lg font-medium text-cream">
            Your bag is empty
          </p>

          <p className="mt-1 text-sm text-cream/60">
            Tap the bag under any drink to add it here.
          </p>
        </div>
      ) : (
        <>
          <ul className="flex flex-col gap-0.5">
            {lines.map((flavor) => {
              const quantity = bag[flavor.id];

              return (
                <li
                  key={flavor.id}
                  className="flex items-center gap-3 rounded-2xl p-2"
                >
                  <IngredientTile
                    flavor={flavor}
                    className="size-11 shrink-0 rounded-xl"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-heading font-soft text-[0.9375rem] font-medium leading-tight text-cream">
                      {flavor.title}
                    </p>

                    <p className="mt-0.5 text-xs tabular-nums text-cream/55">
                      {formatPrice(flavor.price * quantity)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center rounded-full border border-cream/15 p-0.5">
                    <button
                      type="button"
                      onClick={() => onChange(flavor.id, -1)}
                      aria-label={`Remove one ${flavor.title}`}
                      className={stepperClassName}
                    >
                      <Minus aria-hidden className="size-3.5" />
                    </button>

                    <span className="w-6 text-center text-sm font-semibold tabular-nums">
                      {quantity}
                      <span className="sr-only"> in your bag</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => onChange(flavor.id, 1)}
                      aria-label={`Add one more ${flavor.title}`}
                      className={stepperClassName}
                    >
                      <Plus aria-hidden className="size-3.5" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mx-2 mt-2 flex items-center justify-between border-t border-cream/10 px-1 pb-1 pt-3">
            <span className="text-sm text-cream/70">Subtotal</span>

            <span className="font-heading font-soft text-xl font-medium tabular-nums text-cream">
              {formatPrice(subtotal)}
            </span>
          </div>

          <button
            type="button"
            onClick={onClear}
            className="mt-2 w-full cursor-pointer rounded-2xl px-4 py-2.5 text-sm font-medium text-cream/70 transition-colors hover:bg-cream/5 hover:text-cream focus-visible:outline-2 focus-visible:outline-crema"
          >
            Clear bag
          </button>
        </>
      )}
    </>
  );
};

export default BagPanel;
