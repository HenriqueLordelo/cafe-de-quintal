import type { FC, ReactNode } from "react";

import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { siteConfig } from "@/constants/site";

const NotFound: FC = (): ReactNode => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-espresso px-6 text-center text-cream">
      <Head>
        <title>{`Page not found - ${siteConfig.name}`}</title>
      </Head>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgb(217_160_102/0.16),transparent_70%)]"
      />

      <p className="relative font-heading font-soft text-[1.75rem] font-semibold leading-none tracking-[-0.04em]">
        kuro
      </p>

      <h1 className="relative mt-10 font-heading font-soft text-[clamp(5rem,18vw,9rem)] font-medium leading-none tracking-[-0.04em] text-crema">
        404
      </h1>

      <p className="relative mt-4 font-heading font-soft text-2xl font-medium">
        This cup is empty.
      </p>

      <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-cream/65">
        The page you were looking for has moved or never existed.
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

export default NotFound;
