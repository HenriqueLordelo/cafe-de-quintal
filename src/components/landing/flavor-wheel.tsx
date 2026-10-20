import type { CSSProperties, FC, ReactNode, RefObject } from "react";
import type { Flavor } from "@/types";

import { useEffect, useRef } from "react";
import { mod } from "@/lib/utils";
import IngredientTile from "@/components/landing/ingredient-tile";

interface FlavorWheelProps {
  flavors: Flavor[];
  position: number;
  wheelRef: RefObject<HTMLDivElement | null>;
  onPick: (offset: number) => void;
}

/*
 * Tiles are rendered for every slot within WINDOW steps of the current
 * position. Slots are keyed by their absolute index, so a tile keeps its DOM
 * node while the wheel turns and only far, invisible slots mount or unmount.
 * The hero keeps the drawn rotation within 3 steps of the position, and a
 * tile is visible up to 2.85 steps away, so 7 always covers what is on screen.
 * The rotation itself (--rot) is written straight to the wheel by the hero.
 */
const WINDOW = 7;

const FlavorWheel: FC<FlavorWheelProps> = ({
  flavors,
  position,
  wheelRef,
  onPick,
}): ReactNode => {
  const lastOffsetRef = useRef(1);

  const slots = Array.from(
    { length: WINDOW * 2 + 1 },
    (_, index) => position - WINDOW + index,
  );

  useEffect(() => {
    const wheel = wheelRef.current;
    const focused = document.activeElement;

    if (!wheel || !(focused instanceof HTMLElement) || !wheel.contains(focused))
      return;
    if (focused.dataset.reachable === "true") return;

    const next = wheel.querySelector<HTMLButtonElement>(
      `[data-slot='${position + lastOffsetRef.current}']`,
    );
    next?.focus({ preventScroll: true });
  }, [position, wheelRef]);

  return (
    <div
      ref={wheelRef}
      role="group"
      aria-label="Flavors"
      className="kuro-wheel absolute left-1/2 top-(--wheel-y) z-20 size-0"
    >
      {slots.map((slot) => {
        const index = mod(slot, flavors.length);
        const flavor = flavors[index];
        const offset = slot - position;
        const reachable = offset !== 0 && Math.abs(offset) <= 2;

        return (
          <button
            key={slot}
            type="button"
            data-slot={slot}
            data-reachable={reachable}
            tabIndex={reachable ? 0 : -1}
            aria-hidden={!reachable}
            aria-label={`Choose ${flavor.title}`}
            title={flavor.title}
            onFocus={() => {
              lastOffsetRef.current = offset;
            }}
            onClick={() => onPick(offset)}
            style={{ "--v": slot } as CSSProperties}
            className="kuro-tile group absolute left-[calc(var(--tile)/-2)] top-[calc(var(--tile)/-2)] size-(--tile) cursor-pointer rounded-[24%] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crema data-[reachable=false]:pointer-events-none"
          >
            <span
              className="kuro-float block size-full"
              style={{ animationDelay: `${index * -1.2}s` }}
            >
              <IngredientTile
                flavor={flavor}
                glass
                className="size-full rounded-[24%] transition-[scale] duration-300 ease-out group-hover:scale-[1.06] group-active:scale-95"
              />
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FlavorWheel;
