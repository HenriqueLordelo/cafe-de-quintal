import type { FC, ReactNode } from "react";
import type { Flavor } from "@/types";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import IngredientTile from "@/components/landing/ingredient-tile";
import { useSite } from "@/components/landing/site-provider";

interface MenuCardProps {
  flavor: Flavor;
}

const MenuCard: FC<MenuCardProps> = ({ flavor }): ReactNode => {
  const { addToBag } = useSite();
  const [added, setAdded] = useState(false);

  const price = formatPrice(flavor.price);

  useEffect(() => {
    if (!added) return;

    const timer = window.setTimeout(() => setAdded(false), 1400);

    return () => window.clearTimeout(timer);
  }, [added]);

  const add = () => {
    addToBag(flavor.id);
    setAdded(true);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-cream/10 bg-roast transition-colors duration-300 hover:border-cream/20">
      <div className="relative aspect-[4/5] overflow-hidden bg-espresso">
        <Image
          src={flavor.scene}
          alt={flavor.sceneAlt}
          fill
          sizes="(min-width: 1024px) 70vw, (min-width: 640px) 110vw, 220vw"
          className="kuro-reveal-media object-cover object-[50%_48%] transition-[scale] duration-700 ease-out group-hover:scale-105"
        />

        <IngredientTile
          flavor={flavor}
          className="absolute left-4 top-4 size-14 rounded-2xl shadow-[0_16px_30px_-12px_rgb(0_0_0/0.8)] ring-1 ring-black/10"
        />

        <span className="absolute right-4 top-4 rounded-full bg-espresso/70 px-3 py-1.5 text-sm font-semibold tabular-nums text-cream backdrop-blur-md">
          {price}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading font-soft text-2xl font-medium leading-tight tracking-[-0.02em] text-cream">
          {flavor.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-cream/65">
          {flavor.description}
        </p>

        <ul
          aria-label={`${flavor.title} tasting notes`}
          className="mt-4 flex flex-wrap gap-1.5"
        >
          {flavor.notes.map((note) => (
            <li
              key={note}
              className="rounded-full border border-cream/15 px-2.5 py-1 text-xs text-cream/75"
            >
              {note}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={add}
            aria-label={`Add ${flavor.title} to your bag, ${price}`}
            className={cn(
              "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema",
              added
                ? "bg-crema text-espresso"
                : "bg-cream text-espresso hover:bg-white",
            )}
          >
            {added ? (
              <Check aria-hidden className="size-4" strokeWidth={2.5} />
            ) : (
              <ShoppingBag aria-hidden className="size-4" />
            )}

            {added ? "Added to your bag" : "Add to bag"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MenuCard;
