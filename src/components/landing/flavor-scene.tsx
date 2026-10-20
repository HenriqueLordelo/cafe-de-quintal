import type { FC, ReactNode } from "react";
import type { Flavor } from "@/types";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FlavorSceneProps {
  flavors: Flavor[];
  activeIndex: number;
}

/*
 * The hero photos are the page's LCP. A quality of their own keeps their
 * optimized URLs apart from the lazy menu cards that show the same photos,
 * which would otherwise trip Next's "LCP image is lazy" warning.
 * Must be listed in images.qualities in next.config.ts.
 */
const HERO_QUALITY = 85;

type PourState = {
  active: number;
  previous: number | null;
  pouring: boolean;
};

/*
 * Every photo is the same cup with a different drink color. The new flavor
 * sits on top and pours in from the top down over the previous one, which
 * stays visible underneath until the pour has covered it.
 */
const FlavorScene: FC<FlavorSceneProps> = ({
  flavors,
  activeIndex,
}): ReactNode => {
  const [pour, setPour] = useState<PourState>({
    active: activeIndex,
    previous: null,
    pouring: false,
  });

  if (pour.active !== activeIndex) {
    setPour({ active: activeIndex, previous: pour.active, pouring: true });
  }

  return (
    <div className="kuro-scene pointer-events-none absolute left-1/2 top-(--scene-top) h-(--s) w-(--scene-w) -translate-x-1/2">
      {flavors.map((flavor, index) => {
        const isActive = index === activeIndex;
        const isPrevious = !isActive && index === pour.previous;

        return (
          <Image
            key={flavor.id}
            src={flavor.scene}
            alt={isActive ? flavor.sceneAlt : ""}
            aria-hidden={!isActive}
            fill
            preload={index === 0}
            quality={HERO_QUALITY}
            draggable={false}
            sizes="(max-width: 639px) 250vw, 180vh"
            className={cn(
              "object-cover",
              isActive && "z-2 opacity-100",
              isActive && pour.pouring && "kuro-pour",
              isPrevious && "z-1 opacity-100",
              !isActive && !isPrevious && "z-0 opacity-0",
            )}
          />
        );
      })}
    </div>
  );
};

export default FlavorScene;
