import type { FC, ReactNode } from "react";

import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/landing/reveal";
import { useBrand } from "@/components/landing/site-provider";

import { NAV_LINKS } from "@/constants/site";

const EXPLORE_LINKS = NAV_LINKS.filter((link) => link.href !== "#join");

export const Footer: FC = (): ReactNode => {
  const brand = useBrand();

  return (
    <footer className="border-t border-cream/10 bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <Reveal>
            <Link
              href="/#hero"
              className="rounded-md font-heading font-soft text-4xl font-semibold leading-none tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crema"
            >
              {brand.wordmark}
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              {brand.tagline} Made in small batches, flavored fresh every
              morning.
            </p>
          </Reveal>

          <Reveal as="nav" delay={120} aria-labelledby="footer-explore">
            <h2
              id="footer-explore"
              className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cream/45"
            >
              Explore
            </h2>

            <ul className="mt-4 flex flex-col gap-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${link.href}`}
                    className="rounded text-sm text-cream/75 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240}>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cream/45">
              Stay in touch
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              New flavors land every season. Be the first to know.
            </p>

            <Link
              href="/#join"
              className="mt-4 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-crema transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema"
            >
              Join the list
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand.company}. All rights reserved.</p>

          <Link
            href="/#hero"
            className="inline-flex w-fit items-center gap-1.5 rounded transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema"
          >
            Back to top
            <ArrowUp aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
