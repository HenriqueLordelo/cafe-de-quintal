import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useSite } from "@/components/landing/site-provider";

import { BRANDS, BRAND_ORDER } from "@/constants/brands";

interface BrandSwitchProps {
  variant?: "segmented" | "compact";
  className?: string;
}

/*
 * Switches the whole site between the coffee and matcha menus.
 * "segmented" shows both options with labels; "compact" is a single icon
 * button that flips to the other menu, for tight spaces.
 */
const BrandSwitch: FC<BrandSwitchProps> = ({
  variant = "segmented",
  className,
}): ReactNode => {
  const { brand, setBrand } = useSite();

  if (variant === "compact") {
    const nextId = BRAND_ORDER.find((id) => id !== brand.id) ?? brand.id;
    const next = BRANDS[nextId];
    const NextIcon = next.icon;
    const label = `Switch to ${next.label.toLowerCase()}`;

    return (
      <button
        type="button"
        onClick={() => setBrand(nextId)}
        aria-label={label}
        title={label}
        className={cn(
          "grid size-9 cursor-pointer place-items-center rounded-[0.85rem] border border-cream/10 bg-espresso/45 text-crema backdrop-blur-md transition-colors hover:bg-espresso/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema",
          className,
        )}
      >
        <NextIcon aria-hidden className="size-4" />
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Menu"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-cream/10 bg-espresso/45 p-1 backdrop-blur-md",
        className,
      )}
    >
      {BRAND_ORDER.map((id) => {
        const option = BRANDS[id];
        const Icon = option.icon;
        const active = id === brand.id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => setBrand(id)}
            aria-pressed={active}
            className={cn(
              "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema",
              active
                ? "bg-cream text-espresso"
                : "text-cream/70 hover:text-cream",
            )}
          >
            <Icon aria-hidden className="size-4" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default BrandSwitch;
