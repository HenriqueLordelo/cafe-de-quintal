import type { FC, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import type { Brand, HeroPanel } from "@/types";

import { useCallback, useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { cn, mod } from "@/lib/utils";
import AddToBagChip from "@/components/landing/add-to-bag-chip";
import FlavorScene from "@/components/landing/flavor-scene";
import FlavorWheel from "@/components/landing/flavor-wheel";
import HeroNav from "@/components/landing/hero-nav";
import RevealText from "@/components/landing/reveal-text";
import { useSite } from "@/components/landing/site-provider";

interface FlavorHeroProps {
  brand: Brand;
}

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  step: number;
  active: boolean;
};

/* How far the wheel may be dragged in one gesture, in flavor steps. */
const MAX_DRAG_STEPS = 2.4;

/* The drawn rotation never trails the target by more than this many steps. */
const MAX_LAG_STEPS = 3;

/* Time constant of the easing that carries the wheel to its target. */
const SMOOTHING_MS = 150;

/* Page scroll, in svh, that turns the wheel by one flavor. */
const SCROLL_PER_FLAVOR = 55;

/* Share at each end of a scroll step where the wheel rests on a flavor. */
const HOLD = 0.2;

const clamp = (value: number, limit: number): number => {
  return Math.max(-limit, Math.min(limit, value));
};

const pad = (value: number): string => {
  return String(value).padStart(2, "0");
};

/*
 * Mounted once per menu (keyed by brand id in home-content.tsx), so switching
 * between coffee and matcha starts a fresh wheel with its own intro.
 */
const FlavorHero: FC<FlavorHeroProps> = ({ brand }): ReactNode => {
  const { addToBag: addFlavorToBag, bump } = useSite();
  const { flavors } = brand;

  const [position, setPosition] = useState(0);
  const [panel, setPanel] = useState<HeroPanel | null>(null);
  const [added, setAdded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);
  const reducedMotionRef = useRef(false);

  /*
   * The wheel's target rotation is the sum of three inputs: steps taken by
   * clicks and keys, the eased page scroll, and a live drag. The drawn
   * rotation eases toward that target every frame.
   */
  const positionRef = useRef(0);
  const clickRef = useRef(0);
  const scrollRef = useRef(0);
  const dragShiftRef = useRef(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);

  const activeIndex = mod(position, flavors.length);
  const flavor = flavors[activeIndex];

  const writeRotation = useCallback((value: number) => {
    wheelRef.current?.style.setProperty("--rot", value.toFixed(4));
  }, []);

  const startLoop = useCallback(() => {
    if (frameRef.current) return;

    lastTimeRef.current = performance.now();

    const step = (now: number) => {
      const elapsed = Math.min(64, now - lastTimeRef.current);
      const target = targetRef.current;
      let current = currentRef.current;

      lastTimeRef.current = now;

      if (reducedMotionRef.current || Math.abs(target - current) < 0.0005) {
        current = target;
      } else {
        if (Math.abs(target - current) > MAX_LAG_STEPS) {
          current = target - Math.sign(target - current) * MAX_LAG_STEPS;
        }

        current += (target - current) * (1 - Math.exp(-elapsed / SMOOTHING_MS));
      }

      currentRef.current = current;
      writeRotation(current);
      frameRef.current = current === target ? 0 : requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
  }, [writeRotation]);

  const recompute = useCallback(() => {
    const travel = scrollRef.current + dragShiftRef.current;
    const next = clickRef.current + Math.round(travel);

    targetRef.current = clickRef.current + travel;

    if (next !== positionRef.current) {
      const target = flavors[mod(next, flavors.length)];

      positionRef.current = next;
      setPosition(next);
      setAdded(false);
      setAnnouncement(`${target.title} selected, ${formatPrice(target.price)}`);
    }

    startLoop();
  }, [flavors, startLoop]);

  const rotateBy = useCallback(
    (delta: number) => {
      if (delta === 0) return;

      clickRef.current += delta;
      recompute();
    },
    [recompute],
  );

  const pickIndex = useCallback(
    (index: number) => {
      const current = mod(positionRef.current, flavors.length);
      let delta = mod(index - current, flavors.length);

      if (delta > flavors.length / 2) delta -= flavors.length;

      rotateBy(delta);
    },
    [flavors, rotateBy],
  );

  const pickFromPanel = useCallback(
    (index: number) => {
      pickIndex(index);
      setPanel(null);
    },
    [pickIndex],
  );

  const pickTile = useCallback(
    (offset: number) => {
      if (suppressClickRef.current) {
        suppressClickRef.current = false;
        return;
      }

      rotateBy(offset);
    },
    [rotateBy],
  );

  const surprise = useCallback(() => {
    const current = mod(positionRef.current, flavors.length);
    const options = flavors
      .map((_, index) => index)
      .filter((index) => index !== current);

    pickIndex(options[Math.floor(Math.random() * options.length)]);
  }, [flavors, pickIndex]);

  const addToBag = useCallback(() => {
    const current = flavors[mod(positionRef.current, flavors.length)];

    addFlavorToBag(current.id);
    setAdded(true);
    setAnnouncement(`${current.title} added to your bag`);
  }, [addFlavorToBag, flavors]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedMotionRef.current = query.matches;
    };

    sync();
    query.addEventListener("change", sync);

    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  useEffect(() => {
    const steps = flavors.length - 1;
    let frame = 0;

    const update = () => {
      frame = 0;

      const track = trackRef.current;
      const stage = stageRef.current;

      if (!track || !stage) return;

      const distance = track.offsetHeight - stage.offsetHeight;
      const progress =
        distance > 0
          ? Math.min(
              1,
              Math.max(0, -track.getBoundingClientRect().top / distance),
            )
          : 0;

      const raw = progress * steps;
      const base = Math.min(Math.floor(raw), steps);
      const eased = Math.min(
        1,
        Math.max(0, (raw - base - HOLD) / (1 - HOLD * 2)),
      );

      scrollRef.current = base + eased * eased * (3 - 2 * eased);
      setScrolled(progress > 0.01);
      recompute();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [flavors, recompute]);

  useEffect(() => {
    if (!added) return;

    const timer = window.setTimeout(() => setAdded(false), 1600);

    return () => window.clearTimeout(timer);
  }, [added, bump]);

  useEffect(() => {
    if (panel) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      )
        return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      const target = event.target as HTMLElement | null;

      if (
        target?.closest(
          'input, textarea, select, [contenteditable="true"], [role="dialog"]',
        )
      )
        return;

      event.preventDefault();
      rotateBy(event.key === "ArrowRight" ? 1 : -1);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [panel, rotateBy]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    suppressClickRef.current = false;

    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("[data-no-drag]")) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      step: probeRef.current?.offsetWidth || 200,
      active: false,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (!drag.active) {
      if (Math.abs(dy) > 14 && Math.abs(dy) > Math.abs(dx)) {
        dragRef.current = null;
        return;
      }

      if (Math.abs(dx) < 8) return;

      drag.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    dragShiftRef.current = clamp(-dx / drag.step, MAX_DRAG_STEPS);
    recompute();

    currentRef.current = targetRef.current;
    writeRotation(currentRef.current);
  };

  const finishDrag = (
    event: ReactPointerEvent<HTMLDivElement>,
    cancelled: boolean,
  ) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;

    if (!drag.active) return;

    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);

    const shift = dragShiftRef.current;
    let delta = Math.round(shift);

    if (delta === 0 && Math.abs(shift) > 0.25) delta = shift > 0 ? 1 : -1;
    if (cancelled) delta = 0;

    dragShiftRef.current = 0;
    clickRef.current += delta;
    recompute();
  };

  return (
    <section
      id="hero"
      ref={trackRef}
      aria-labelledby="hero-title"
      className="relative w-full"
      style={{
        height: `calc(max(100svh, 40rem) + ${(flavors.length - 1) * SCROLL_PER_FLAVOR}svh)`,
      }}
    >
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(event) => finishDrag(event, false)}
        onPointerCancel={(event) => finishDrag(event, true)}
        className="kuro-stage sticky top-0 isolate h-svh min-h-[40rem] w-full touch-pan-y select-none overflow-clip text-cream sm:min-h-[37.5rem]"
      >
        <FlavorScene flavors={flavors} activeIndex={activeIndex} />

        <span
          ref={probeRef}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 h-px w-(--wheel-d1)"
        />

        <HeroNav
          flavors={flavors}
          activeIndex={activeIndex}
          panel={panel}
          added={added}
          onPanelChange={setPanel}
          onPick={pickFromPanel}
          onSurprise={surprise}
          onAdd={addToBag}
        />

        <h1
          id="hero-title"
          className="pointer-events-none absolute inset-x-0 top-(--headline-top) z-10 px-5 text-center font-heading font-soft text-(length:--h-size) font-medium leading-[1.04] tracking-[-0.03em] text-cream [text-shadow:0_6px_40px_rgb(0_0_0/0.5)] sm:whitespace-nowrap"
        >
          <span className="block">
            <RevealText
              immediate
              text="Choose your"
              delay={250}
              className="kuro-words-soft"
            />{" "}
            <br className="sm:hidden" />
            <RevealText
              immediate
              text={brand.drink}
              delay={250}
              startIndex={2}
              className="kuro-words-soft"
            />
          </span>
        </h1>

        <FlavorWheel
          flavors={flavors}
          position={position}
          wheelRef={wheelRef}
          onPick={pickTile}
        />

        <p className="pointer-events-none absolute inset-x-0 top-(--label-y) z-10 -translate-y-1/2 text-center font-heading font-soft text-(length:--label-size) font-medium leading-none tracking-[-0.02em] text-cream [text-shadow:0_2px_22px_rgb(0_0_0/0.6)]">
          <span
            key={flavor.id}
            className="inline-block animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            {flavor.name}
          </span>
        </p>

        <AddToBagChip flavor={flavor} added={added} onAdd={addToBag} />

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-5 left-4 z-20 hidden max-sm:block sm:bottom-8 sm:left-8 lg:block"
        >
          <p className="font-heading font-soft font-medium leading-none tabular-nums text-cream">
            <span className="text-2xl sm:text-3xl">{pad(activeIndex + 1)}</span>
            <span className="text-sm text-cream/50">
              {" "}
              / {pad(flavors.length)}
            </span>
          </p>

          <div className="mt-2.5 flex items-center gap-1">
            {flavors.map((item, index) => (
              <span
                key={item.id}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  index === activeIndex ? "w-6 bg-crema" : "w-2 bg-cream/25",
                )}
              />
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-5 right-4 z-20 hidden items-center gap-2 text-xs font-medium text-cream/70 transition-opacity duration-500 max-sm:flex sm:bottom-8 sm:right-8 lg:flex",
            scrolled ? "opacity-0" : "opacity-100",
          )}
        >
          <span>Scroll to taste</span>

          <span className="kuro-scroll-cue grid size-7 place-items-center rounded-full border border-cream/20">
            <ChevronDown className="size-4" />
          </span>
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
    </section>
  );
};

export default FlavorHero;
