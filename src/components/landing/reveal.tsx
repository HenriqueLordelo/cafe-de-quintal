import type {
  CSSProperties,
  ElementType,
  FC,
  HTMLAttributes,
  ReactNode,
} from "react";

import { useReveal } from "@/hooks/use-reveal";

type RevealVariant = "fade-up" | "fade" | "image";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  children?: ReactNode;
};

/*
 * Fades its content in the first time it scrolls into view.
 * 'image' rises the box and slowly zooms out any .kuro-reveal-media inside.
 */
const Reveal: FC<RevealProps> = ({
  as: Tag = "div",
  variant = "fade-up",
  delay = 0,
  style,
  children,
  ...rest
}): ReactNode => {
  const ref = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
