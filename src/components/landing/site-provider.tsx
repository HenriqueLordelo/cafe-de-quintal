import type { FC, ReactNode } from "react";
import type { Bag, Brand, BrandId } from "@/types";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { BRANDS, BRAND_STORAGE_KEY, DEFAULT_BRAND } from "@/constants/brands";

interface SiteContextValue {
  brand: Brand;
  setBrand: (id: BrandId) => void;
  bag: Bag;
  bagCount: number;
  bump: number;
  addToBag: (id: string) => void;
  changeBag: (id: string, delta: number) => void;
  clearBag: () => void;
  motionPaused: boolean;
  toggleMotion: () => void;
}

interface SiteProviderProps {
  children: ReactNode;
}

const SiteContext = createContext<SiteContextValue | null>(null);

const isBrandId = (value: string | null): value is BrandId => {
  return value === "coffee" || value === "matcha";
};

/*
 * The chosen menu lives in localStorage, read through useSyncExternalStore so
 * the server render and hydration use DEFAULT_BRAND and the saved choice is
 * picked up right after. memoryBrand keeps the switch working when storage is
 * unavailable (private mode).
 */
const brandListeners = new Set<() => void>();

let memoryBrand: BrandId | null = null;

const readBrand = (): BrandId => {
  if (memoryBrand) return memoryBrand;

  try {
    const saved = localStorage.getItem(BRAND_STORAGE_KEY);

    if (isBrandId(saved)) return saved;
  } catch {
    // Storage can be unavailable (private mode); keep the default menu.
  }

  return DEFAULT_BRAND;
};

const writeBrand = (id: BrandId) => {
  memoryBrand = id;

  try {
    localStorage.setItem(BRAND_STORAGE_KEY, id);
  } catch {
    // Remembering the choice is a nicety; the switch still works without it.
  }

  brandListeners.forEach((listener) => listener());
};

const subscribeBrand = (listener: () => void) => {
  brandListeners.add(listener);

  return () => {
    brandListeners.delete(listener);
  };
};

const getServerBrand = (): BrandId => DEFAULT_BRAND;

/*
 * Page-wide state shared by the hero, the sections and both headers: the
 * active menu (coffee or matcha), the bag, a counter that bumps on every add
 * (drives the badge animation), and the "pause motion" switch. The menu and
 * motion choices are mirrored to <html data-brand> and <html data-motion>,
 * which is what switches the palette and pauses ambient animation in CSS.
 */
export const SiteProvider: FC<SiteProviderProps> = ({
  children,
}): ReactNode => {
  const brandId = useSyncExternalStore(
    subscribeBrand,
    readBrand,
    getServerBrand,
  );
  const [bag, setBag] = useState<Bag>({});
  const [bump, setBump] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);

  const switchTimerRef = useRef(0);

  useEffect(() => {
    document.documentElement.dataset.brand = brandId;
  }, [brandId]);

  /* Turns on scroll reveals (see globals.css); skipped for reduced motion. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;

    root.classList.add("kuro-reveal");

    return () => root.classList.remove("kuro-reveal");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = motionPaused
      ? "paused"
      : "running";
  }, [motionPaused]);

  useEffect(() => {
    return () => window.clearTimeout(switchTimerRef.current);
  }, []);

  const setBrand = useCallback((id: BrandId) => {
    const root = document.documentElement;

    root.dataset.brandSwitching = "true";
    window.clearTimeout(switchTimerRef.current);
    switchTimerRef.current = window.setTimeout(() => {
      delete root.dataset.brandSwitching;
    }, 900);

    writeBrand(id);
  }, []);

  const addToBag = useCallback((id: string) => {
    setBag((previous) => ({ ...previous, [id]: (previous[id] ?? 0) + 1 }));
    setBump((value) => value + 1);
  }, []);

  const changeBag = useCallback((id: string, delta: number) => {
    setBag((previous) => {
      const quantity = (previous[id] ?? 0) + delta;
      const next = { ...previous };

      if (quantity <= 0) delete next[id];
      else next[id] = quantity;

      return next;
    });
  }, []);

  const clearBag = useCallback(() => {
    setBag({});
  }, []);

  const toggleMotion = useCallback(() => {
    setMotionPaused((value) => !value);
  }, []);

  const bagCount = useMemo(() => {
    return Object.values(bag).reduce((sum, quantity) => sum + quantity, 0);
  }, [bag]);

  const value = useMemo<SiteContextValue>(
    () => ({
      brand: BRANDS[brandId],
      setBrand,
      bag,
      bagCount,
      bump,
      addToBag,
      changeBag,
      clearBag,
      motionPaused,
      toggleMotion,
    }),
    [
      brandId,
      setBrand,
      bag,
      bagCount,
      bump,
      addToBag,
      changeBag,
      clearBag,
      motionPaused,
      toggleMotion,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export const useSite = (): SiteContextValue => {
  const context = useContext(SiteContext);

  if (!context) throw new Error("useSite must be used inside SiteProvider");

  return context;
};

/* Safe outside the provider (shared layout pieces): falls back to the default menu. */
export const useBrand = (): Brand => {
  const context = useContext(SiteContext);

  return context?.brand ?? BRANDS[DEFAULT_BRAND];
};
