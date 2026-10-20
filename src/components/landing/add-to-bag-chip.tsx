import type { FC, ReactNode } from "react";
import type { Flavor } from "@/types";

import { Check, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface AddToBagChipProps {
  flavor: Flavor;
  added: boolean;
  onAdd: () => void;
}

const AddToBagChip: FC<AddToBagChipProps> = ({
  flavor,
  added,
  onAdd,
}): ReactNode => {
  const price = formatPrice(flavor.price);

  return (
    <button
      type="button"
      data-no-drag
      onClick={onAdd}
      aria-label={`Add ${flavor.title} to your bag, ${price}`}
      className="absolute left-1/2 top-(--chip-y) z-20 flex size-(--chip) -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center gap-1 rounded-[30%] bg-cream text-espresso shadow-[0_20px_44px_-16px_rgb(0_0_0/0.85)] ring-1 ring-black/10 transition-[scale] duration-200 ease-out hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crema active:scale-95"
    >
      <span
        key={flavor.id}
        className="text-[0.6875rem] font-bold leading-none tabular-nums animate-in fade-in duration-300"
      >
        {price}
      </span>

      <span
        className={cn(
          "grid size-[44%] place-items-center rounded-full transition-colors duration-300",
          added ? "bg-crema text-espresso" : "bg-espresso text-cream",
        )}
      >
        {added ? (
          <Check aria-hidden className="size-4" strokeWidth={2.5} />
        ) : (
          <ShoppingBag aria-hidden className="size-4" />
        )}
      </span>
    </button>
  );
};

export default AddToBagChip;
