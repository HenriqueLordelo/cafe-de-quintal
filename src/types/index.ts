import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type SiteConfig = {
  name: string;
  description: string;
  placeholder: string;
  url: string;
  ogImage?: string;
  links?: {
    twitter?: string;
    github?: string;
  };
};

export type LayoutProps = {
  header?: ReactNode;
  children: ReactNode;
};

export type NavLink = {
  label: string;
  href: string;
};

export type SeoProps = {
  title?: string;
  description?: string;
  ogImage?: string;
};

export type FlavorTile = {
  sheet: string;
  col: number;
  row: number;
};

export type Flavor = {
  id: string;
  name: string;
  title: string;
  description: string;
  notes: string[];
  price: number;
  caffeine: number;
  scene: string;
  sceneAlt: string;
  ingredient: string;
  tile: FlavorTile;
};

export type Bag = Record<string, number>;

export type StoryStat = {
  value: string;
  label: string;
};

export type ProcessStep = {
  title: string;
  text: string;
  image: string;
  alt: string;
};

export type OriginFact = {
  label: string;
  value: string;
};

export type Origin = {
  region: string;
  country: string;
  share: string;
  description: string;
  contourAt: string;
  facts: OriginFact[];
};

export type DrinkOption = {
  label: string;
  values: string[];
};

export type HeroPanel = "flavors" | "notes" | "bag";

export type BrandId = "coffee" | "matcha";

export type BrandStory = {
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  badgeValue: string;
  badgeLabel: string;
  stats: StoryStat[];
};

export type Brand = {
  id: BrandId;
  label: string;
  wordmark: string;
  company: string;
  drink: string;
  tagline: string;
  icon: LucideIcon;
  markIcon: LucideIcon;
  originIcon: LucideIcon;
  flavors: Flavor[];
  story: BrandStory;
  menu: {
    title: string;
    description: string;
  };
  options: DrinkOption[];
  process: {
    title: string;
    steps: ProcessStep[];
  };
  origins: {
    title: string;
    description: string;
    items: Origin[];
  };
};
