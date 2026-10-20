import type { FC, ReactNode, Ref } from "react";

import { cn } from "@/lib/utils";

interface PanelShellProps {
  id: string;
  label: string;
  panelRef?: Ref<HTMLDivElement>;
  className?: string;
  children: ReactNode;
}

const PanelShell: FC<PanelShellProps> = ({
  id,
  label,
  panelRef,
  className,
  children,
}): ReactNode => {
  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-label={label}
      tabIndex={-1}
      className={cn(
        "absolute left-1/2 top-full z-40 mt-3 max-h-[min(34rem,calc(100svh_-_6rem))] w-[min(23rem,calc(100vw_-_2rem))] -translate-x-1/2 origin-top overflow-y-auto rounded-[1.75rem] border border-cream/10 bg-roast/95 p-2 text-cream shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)] outline-none backdrop-blur-xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PanelShell;
