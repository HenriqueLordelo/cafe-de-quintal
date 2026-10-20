import type { FC, ReactNode } from "react";

import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import BagPanel from "@/components/landing/bag-panel";
import BrandSwitch from "@/components/landing/brand-switch";
import PanelShell from "@/components/landing/panel-shell";
import SiteMenu from "@/components/landing/site-menu";
import { useSite } from "@/components/landing/site-provider";

import { ALL_FLAVORS } from "@/constants/flavors";
import { NAV_LINKS } from "@/constants/site";

const BAG_PANEL_ID = "kuro-header-bag";

const SECTION_LINKS = NAV_LINKS.filter((link) => link.href !== "#join");

/*
 * The hero carries its own header, so this one only slides in once the
 * hero has scrolled past.
 */
const SiteHeader: FC = (): ReactNode => {
  const { brand, bag, bagCount, bump, changeBag, clearBag } = useSite();

  const [visible, setVisible] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);

  const bagRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const hero = document.getElementById("hero");
      const next = hero
        ? hero.getBoundingClientRect().bottom < 72
        : window.scrollY > 80;

      setVisible(next);

      // The bag closes whenever the header slides away.
      if (!next) setBagOpen(false);
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
  }, []);

  useEffect(() => {
    if (!bagOpen) return;

    panelRef.current?.focus({ preventScroll: true });

    const onPointerDown = (event: PointerEvent) => {
      if (bagRef.current?.contains(event.target as Node)) return;
      setBagOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setBagOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [bagOpen]);

  const bagLabel =
    bagCount === 0
      ? "Your bag, empty"
      : `Your bag, ${bagCount} ${bagCount === 1 ? "drink" : "drinks"}`;

  return (
    <header
      inert={!visible}
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-[translate,opacity] duration-500 ease-out sm:px-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[1.25rem] border border-cream/10 bg-espresso/80 py-2 pl-5 pr-2 text-cream shadow-[0_18px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl"
      >
        <a
          href="#hero"
          className="rounded-md font-heading font-soft text-[1.625rem] font-semibold leading-none tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crema"
        >
          {brand.wordmark}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {SECTION_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-cream/70 transition-colors hover:bg-cream/[0.07] hover:text-cream focus-visible:outline-2 focus-visible:outline-crema"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <BrandSwitch className="hidden border-transparent bg-cream/6 backdrop-blur-none sm:inline-flex" />
          <BrandSwitch
            variant="compact"
            className="size-10 border-transparent bg-cream/6 backdrop-blur-none sm:hidden"
          />

          <a
            href="#join"
            className="hidden rounded-full bg-cream px-4 py-2.5 text-sm font-semibold text-espresso transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema sm:inline-flex"
          >
            Join the list
          </a>

          <div ref={bagRef} className="relative">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setBagOpen((value) => !value)}
              aria-label={bagLabel}
              title={bagLabel}
              aria-haspopup="dialog"
              aria-expanded={bagOpen}
              aria-controls={bagOpen ? BAG_PANEL_ID : undefined}
              className={cn(
                "relative grid size-10 cursor-pointer place-items-center rounded-[0.9rem] text-cream transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema",
                bagOpen ? "bg-cream/15" : "bg-cream/6 hover:bg-cream/10",
              )}
            >
              <ShoppingBag aria-hidden className="size-4" />

              {bagCount > 0 && (
                <span
                  key={bump}
                  aria-hidden
                  className="kuro-bump absolute -right-1.5 -top-1.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-crema px-1 text-[0.625rem] font-bold leading-none text-espresso ring-2 ring-espresso"
                >
                  {bagCount}
                </span>
              )}
            </button>

            {bagOpen && (
              <PanelShell
                id={BAG_PANEL_ID}
                label="Your bag"
                panelRef={panelRef}
                className="left-auto right-0 origin-top-right translate-x-0"
              >
                <BagPanel
                  flavors={ALL_FLAVORS}
                  bag={bag}
                  onChange={changeBag}
                  onClear={clearBag}
                />
              </PanelShell>
            )}
          </div>

          <SiteMenu triggerClassName="bg-cream/6 backdrop-blur-none lg:hidden" />
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
