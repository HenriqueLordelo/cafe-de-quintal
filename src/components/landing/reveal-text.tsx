import type { CSSProperties, FC, ReactNode } from "react";

import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

interface RevealTextProps {
  text: string;
  delay?: number;
  startIndex?: number;
  immediate?: boolean;
  className?: string;
}

/*
 * Splits text into words that slide up one after another. By default the
 * words wait until the text scrolls into view; `immediate` plays them on load
 * (for text that is already on screen). `startIndex` continues the stagger
 * from an earlier piece of the same line.
 */
const RevealText: FC<RevealTextProps> = ({
  text,
  delay = 0,
  startIndex = 0,
  immediate = false,
  className,
}): ReactNode => {
  const ref = useReveal<HTMLSpanElement>(!immediate);
  const words = text.split(" ").filter(Boolean);

  return (
    <span
      ref={ref}
      data-reveal={immediate ? undefined : "words"}
      data-reveal-now={immediate ? "" : undefined}
      className={cn("kuro-words", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="kuro-word">
            <span
              className="kuro-word-inner"
              style={{ "--i": startIndex + index } as CSSProperties}
            >
              {word}
            </span>
          </span>

          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
};

export default RevealText;
