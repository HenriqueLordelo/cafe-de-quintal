import type { FC, ReactNode } from "react";

import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { siteConfig } from "@/constants/site";

const ServerError: FC = (): ReactNode => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-espresso px-6 text-center text-cream">
      <Head>
        <title>{`Something went wrong - ${siteConfig.name}`}</title>
      </Head>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgb(217_160_102/0.16),transparent_70%)]"
      />

      <p className="relative font-heading font-soft text-[1.75rem] font-semibold leading-none tracking-[-0.04em]">
        kuro
      </p>

      <h1 className="relative mt-10 font-heading font-soft text-[clamp(2.5rem,8vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
        Something spilled.
      </h1>

      <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-cream/65">
        We hit a snag pouring this page. Please try again in a moment.
      </p>

      <Link
        href="/"
        className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crema"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Back to the flavors
      </Link>
    </main>
  );
};

export default ServerError;
