import { useEffect, useRef } from "react";

let sharedObserver: IntersectionObserver | null = null;

/* One observer for every revealed element on the page. */
const getObserver = (): IntersectionObserver => {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;

          element.dataset.revealed = "true";
          observer.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );
  }

  return sharedObserver;
};

/*
 * Marks the element with data-revealed the first time it scrolls into view.
 * CSS in globals.css (data-reveal / data-revealed) does the animating.
 */
export function useReveal<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;

    if (!enabled || !element) return;

    if (!("IntersectionObserver" in window)) {
      element.dataset.revealed = "true";
      return;
    }

    const observer = getObserver();

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [enabled]);

  return ref;
}
