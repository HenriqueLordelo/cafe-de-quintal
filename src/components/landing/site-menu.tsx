import type { FC, ReactNode } from "react";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Menu, Pause, Play, X } from "lucide-react";

import { cn } from "@/lib/utils";
import BrandSwitch from "@/components/landing/brand-switch";
import { useSite } from "@/components/landing/site-provider";

import { NAV_LINKS } from "@/constants/site";

interface SiteMenuProps {
  triggerClassName?: string;
}

const SiteMenu: FC<SiteMenuProps> = ({ triggerClassName }): ReactNode => {
  const { brand, motionPaused, toggleMotion } = useSite();
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        title="Menu"
        className={cn(
          "grid size-10 cursor-pointer place-items-center rounded-[0.9rem] border border-cream/10 bg-espresso/45 text-cream/80 backdrop-blur-md transition-colors hover:bg-espresso/70 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema",
          triggerClassName,
        )}
      >
        <Menu aria-hidden className="size-4" />
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-no-drag
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-espresso/95 text-cream backdrop-blur-xl animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between px-4 pt-4 sm:px-8 sm:pt-6">
              <span className="font-heading font-soft text-[1.75rem] font-semibold leading-none tracking-[-0.04em]">
                {brand.wordmark}
              </span>

              <button
                ref={closeRef}
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="grid size-10 cursor-pointer place-items-center rounded-[0.9rem] border border-cream/10 text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema"
              >
                <X aria-hidden className="size-4" />
              </button>
            </div>

            <nav
              aria-label="Site"
              className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-20"
            >
              <ol className="flex flex-col gap-1">
                {NAV_LINKS.map((link, index) => (
                  <li
                    key={link.href}
                    className="animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both"
                    style={{ animationDelay: `${80 + index * 60}ms` }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 rounded-lg py-2 font-heading font-soft text-[clamp(2.25rem,8vw,4.5rem)] font-medium leading-none tracking-[-0.03em] text-cream transition-colors hover:text-crema focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crema"
                    >
                      <span className="font-sans text-sm font-semibold tabular-nums tracking-normal text-cream/40 transition-colors group-hover:text-crema">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {link.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="flex flex-col gap-4 border-t border-cream/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-12 lg:px-20">
              <p className="text-sm text-cream/60">{brand.tagline}</p>

              <div className="flex flex-wrap items-center gap-3">
                <BrandSwitch />

                <button
                  type="button"
                  onClick={toggleMotion}
                  aria-pressed={motionPaused}
                  className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-sm font-medium text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema"
                >
                  {motionPaused ? (
                    <Play aria-hidden className="size-4" />
                  ) : (
                    <Pause aria-hidden className="size-4" />
                  )}

                  {motionPaused
                    ? "Play floating motion"
                    : "Pause floating motion"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default SiteMenu;
