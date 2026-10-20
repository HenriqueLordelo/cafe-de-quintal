import type { FC, ReactNode, Ref } from "react";
import type { Flavor, HeroPanel } from "@/types";

import { useEffect, useRef } from "react";

import {
  Info,
  LayoutGrid,
  Pause,
  Play,
  ShoppingBag,
  Shuffle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import BagPanel from "@/components/landing/bag-panel";
import BrandSwitch from "@/components/landing/brand-switch";
import FlavorsPanel from "@/components/landing/flavors-panel";
import NotesPanel from "@/components/landing/notes-panel";
import PanelShell from "@/components/landing/panel-shell";
import SiteMenu from "@/components/landing/site-menu";
import { useSite } from "@/components/landing/site-provider";

import { ALL_FLAVORS } from "@/constants/flavors";

interface HeroNavProps {
  flavors: Flavor[];
  activeIndex: number;
  panel: HeroPanel | null;
  added: boolean;
  onPanelChange: (panel: HeroPanel | null) => void;
  onPick: (index: number) => void;
  onSurprise: () => void;
  onAdd: () => void;
}

interface PillButtonProps {
  label: string;
  onClick: () => void;
  controls?: string;
  expanded?: boolean;
  dark?: boolean;
  buttonRef?: Ref<HTMLButtonElement>;
  children: ReactNode;
}

const PANEL_IDS: Record<HeroPanel, string> = {
  flavors: "kuro-panel-flavors",
  notes: "kuro-panel-notes",
  bag: "kuro-panel-bag",
};

const PANEL_LABELS: Record<HeroPanel, string> = {
  flavors: "All flavors",
  notes: "Tasting notes",
  bag: "Your bag",
};

const PillButton: FC<PillButtonProps> = ({
  label,
  onClick,
  controls,
  expanded = false,
  dark = false,
  buttonRef,
  children,
}): ReactNode => {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-haspopup={controls ? "dialog" : undefined}
      aria-expanded={controls ? expanded : undefined}
      aria-controls={controls && expanded ? controls : undefined}
      className={cn(
        "relative grid size-9 cursor-pointer place-items-center rounded-[0.85rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema sm:size-10",
        dark
          ? "bg-espresso text-cream hover:bg-black"
          : "text-cream/75 hover:bg-cream/10 hover:text-cream",
        expanded &&
          (dark ? "bg-black ring-1 ring-cream/25" : "bg-cream/15 text-cream"),
      )}
    >
      {children}
    </button>
  );
};

const HeroNav: FC<HeroNavProps> = ({
  flavors,
  activeIndex,
  panel,
  added,
  onPanelChange,
  onPick,
  onSurprise,
  onAdd,
}): ReactNode => {
  const {
    brand,
    bag,
    bagCount,
    bump,
    changeBag,
    clearBag,
    motionPaused,
    toggleMotion,
  } = useSite();

  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<HeroPanel, HTMLButtonElement | null>>({
    flavors: null,
    notes: null,
    bag: null,
  });

  const toggle = (next: HeroPanel) => {
    onPanelChange(panel === next ? null : next);
  };

  useEffect(() => {
    if (!panel) return;

    panelRef.current?.focus({ preventScroll: true });

    const onPointerDown = (event: PointerEvent) => {
      if (menuRef.current?.contains(event.target as Node)) return;
      onPanelChange(null);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onPanelChange(null);
      triggerRefs.current[panel]?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [panel, onPanelChange]);

  const bagLabel =
    bagCount === 0
      ? "Your bag, empty"
      : `Your bag, ${bagCount} ${bagCount === 1 ? "drink" : "drinks"}`;

  return (
    <header data-no-drag className="absolute inset-x-0 top-0 z-30">
      <nav
        aria-label="Main"
        className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 pt-4 sm:gap-3 sm:px-8 sm:pt-6"
      >
        <a
          href="#hero"
          className="justify-self-start rounded-md font-heading font-soft text-[1.5rem] font-semibold leading-none tracking-[-0.04em] text-cream animate-in fade-in slide-in-from-left-2 duration-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crema sm:text-[1.75rem]"
        >
          {brand.wordmark}
        </a>

        <div ref={menuRef} className="relative">
          <div className="flex items-center gap-1 rounded-[1.15rem] border border-cream/10 bg-espresso/45 p-1 shadow-[0_12px_32px_-14px_rgb(0_0_0/0.7)] backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-700">
            <PillButton
              label="All flavors"
              controls={PANEL_IDS.flavors}
              expanded={panel === "flavors"}
              onClick={() => toggle("flavors")}
              buttonRef={(node) => {
                triggerRefs.current.flavors = node;
              }}
            >
              <LayoutGrid aria-hidden className="size-4" />
            </PillButton>

            <PillButton
              label="Tasting notes"
              controls={PANEL_IDS.notes}
              expanded={panel === "notes"}
              onClick={() => toggle("notes")}
              buttonRef={(node) => {
                triggerRefs.current.notes = node;
              }}
            >
              <Info aria-hidden className="size-4" />
            </PillButton>

            <PillButton label="Surprise me" onClick={onSurprise}>
              <Shuffle aria-hidden className="size-4" />
            </PillButton>

            <PillButton
              dark
              label={bagLabel}
              controls={PANEL_IDS.bag}
              expanded={panel === "bag"}
              onClick={() => toggle("bag")}
              buttonRef={(node) => {
                triggerRefs.current.bag = node;
              }}
            >
              <ShoppingBag aria-hidden className="size-4" />

              {bagCount > 0 && (
                <span
                  key={bump}
                  aria-hidden
                  className="kuro-bump absolute -right-1.5 -top-1.5 grid h-[1.125rem] min-w-[1.125rem] place-items-center rounded-full bg-crema px-1 text-[0.625rem] font-bold leading-none text-espresso ring-2 ring-espresso"
                >
                  {bagCount}
                </span>
              )}
            </PillButton>
          </div>

          {panel && (
            <PanelShell
              key={panel}
              id={PANEL_IDS[panel]}
              label={PANEL_LABELS[panel]}
              panelRef={panelRef}
            >
              {panel === "flavors" && (
                <FlavorsPanel
                  flavors={flavors}
                  activeIndex={activeIndex}
                  onPick={onPick}
                />
              )}

              {panel === "notes" && (
                <NotesPanel
                  flavor={flavors[activeIndex]}
                  added={added}
                  onAdd={onAdd}
                />
              )}

              {panel === "bag" && (
                <BagPanel
                  flavors={ALL_FLAVORS}
                  bag={bag}
                  onChange={changeBag}
                  onClear={clearBag}
                />
              )}
            </PanelShell>
          )}
        </div>

        <div className="flex items-center gap-1.5 justify-self-end animate-in fade-in slide-in-from-right-2 duration-700 sm:gap-2">
          <BrandSwitch className="hidden lg:inline-flex" />
          <BrandSwitch
            variant="compact"
            className="max-[379px]:hidden lg:hidden"
          />

          <button
            type="button"
            onClick={toggleMotion}
            aria-pressed={motionPaused}
            aria-label="Pause motion"
            title={motionPaused ? "Play motion" : "Pause motion"}
            className="hidden size-10 cursor-pointer place-items-center rounded-[0.9rem] border border-cream/10 bg-espresso/45 text-cream/80 backdrop-blur-md transition-colors hover:bg-espresso/70 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema sm:grid"
          >
            {motionPaused ? (
              <Play aria-hidden className="size-4" />
            ) : (
              <Pause aria-hidden className="size-4" />
            )}
          </button>

          <SiteMenu />
        </div>
      </nav>
    </header>
  );
};

export default HeroNav;
