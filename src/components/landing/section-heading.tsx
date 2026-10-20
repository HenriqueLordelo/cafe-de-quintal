import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";
import Reveal from "@/components/landing/reveal";
import RevealText from "@/components/landing/reveal-text";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  onCream?: boolean;
  className?: string;
}

const SectionHeading: FC<SectionHeadingProps> = ({
  id,
  eyebrow,
  title,
  description,
  onCream = false,
  className,
}): ReactNode => {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Reveal
        as="p"
        className={cn(
          "text-[0.6875rem] font-semibold uppercase tracking-[0.2em]",
          onCream ? "text-espresso/60" : "text-crema",
        )}
      >
        {eyebrow}
      </Reveal>

      <h2
        id={id}
        className="mt-4 text-balance font-heading font-soft text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.03em]"
      >
        {typeof title === "string" ? (
          <RevealText key={title} text={title} delay={80} />
        ) : (
          title
        )}
      </h2>

      {description && (
        <Reveal
          as="p"
          delay={260}
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            onCream ? "text-espresso/70" : "text-cream/65",
          )}
        >
          {description}
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
