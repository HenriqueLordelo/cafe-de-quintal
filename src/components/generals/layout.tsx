import type { FC, ReactNode } from "react";
import type { LayoutProps } from "@/types";

import { Footer } from "@/components/generals/footer";

export const Layout: FC<LayoutProps> = ({ header, children }): ReactNode => {
  return (
    <div className="flex min-h-screen flex-col">
      {header}

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
};
