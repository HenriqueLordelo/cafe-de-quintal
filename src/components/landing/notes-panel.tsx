import type { FC, ReactNode } from "react";
import type { Flavor } from "@/types";

import { Check, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/format";
import IngredientTile from "@/components/landing/ingredient-tile";

import { DRINK_SIZE } from "@/constants/flavors";

interface NotesPanelProps {
  flavor: Flavor;
  added: boolean;
  onAdd: () => void;
}

const NotesPanel: FC<NotesPanelProps> = ({
  flavor,
  added,
  onAdd,
}): ReactNode => {
  const price = formatPrice(flavor.price);

  return (
    <>
      <div className="flex items-center gap-3 p-2">
        <IngredientTile
          flavor={flavor}
          className="size-14 shrink-0 rounded-2xl"
        />

        <div className="min-w-0">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cream/50">
            Tasting notes
          </p>

          <h2 className="mt-1 font-heading font-soft text-xl font-medium leading-tight text-cream">
            {flavor.title}
          </h2>
        </div>
      </div>

      <p className="px-2 pt-1 text-sm leading-relaxed text-cream/75">
        {flavor.description}
      </p>

      <ul
        aria-label="Flavor notes"
        className="flex flex-wrap gap-1.5 px-2 pt-3"
      >
        {flavor.notes.map((note) => (
          <li
            key={note}
            className="rounded-full border border-cream/15 px-2.5 py-1 text-xs text-cream/85"
          >
            {note}
          </li>
        ))}
      </ul>

      <dl className="mx-2 mt-4 grid grid-cols-3 rounded-2xl bg-cream/5 py-3 text-center">
        <div>
          <dt className="text-[0.6875rem] text-cream/50">Size</dt>
          <dd className="mt-0.5 text-sm font-semibold">{DRINK_SIZE} iced</dd>
        </div>

        <div className="border-x border-cream/10">
          <dt className="text-[0.6875rem] text-cream/50">Caffeine</dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums">
            {flavor.caffeine} mg
          </dd>
        </div>

        <div>
          <dt className="text-[0.6875rem] text-cream/50">Price</dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums">{price}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onAdd}
        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-cream px-4 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema"
      >
        {added ? (
          <Check aria-hidden className="size-4" strokeWidth={2.5} />
        ) : (
          <ShoppingBag aria-hidden className="size-4" />
        )}

        <span>{added ? "Added to your bag" : "Add to bag"}</span>

        {!added && (
          <span className="tabular-nums text-espresso/60">{price}</span>
        )}
      </button>
    </>
  );
};

export default NotesPanel;
