import type { FC, ReactNode } from "react";

import { Html, Head, Main, NextScript } from "next/document";

import { DEFAULT_BRAND } from "@/constants/brands";

const Document: FC = (): ReactNode => {
  return (
    <Html lang="en" data-brand={DEFAULT_BRAND}>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#120b08" />
      </Head>

      <body className="min-h-full flex flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
