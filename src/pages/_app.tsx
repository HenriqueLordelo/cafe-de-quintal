import "@/styles/globals.css";

import type { FC, ReactNode } from "react";
import type { AppProps } from "next/app";

import Head from "next/head";
import { Fraunces, Geist_Mono, Manrope } from "next/font/google";

const sans = Manrope({
  subsets: ["latin"],
});

const heading = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const mono = Geist_Mono({
  subsets: ["latin"],
});

const fontVariables = `:root{--font-app-sans:${sans.style.fontFamily};--font-app-mono:${mono.style.fontFamily};--font-app-heading:${heading.style.fontFamily}}`;

const App: FC<AppProps> = ({ Component, pageProps }): ReactNode => {
  return (
    <div className="h-full font-sans">
      <Head>
        <style dangerouslySetInnerHTML={{ __html: fontVariables }} />
      </Head>

      <Component {...pageProps} />
    </div>
  );
};

export default App;
