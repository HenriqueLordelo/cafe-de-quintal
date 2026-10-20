import type { FC, ReactNode } from "react";

import FlavorHero from "@/components/landing/flavor-hero";
import FlavorMarquee from "@/components/landing/flavor-marquee";
import JoinSection from "@/components/landing/join-section";
import MenuSection from "@/components/landing/menu-section";
import OriginsSection from "@/components/landing/origins-section";
import ProcessSection from "@/components/landing/process-section";
import StorySection from "@/components/landing/story-section";
import { useSite } from "@/components/landing/site-provider";

const HomeContent: FC = (): ReactNode => {
  const { brand } = useSite();

  return (
    <>
      <FlavorHero key={brand.id} brand={brand} />
      <FlavorMarquee />
      <StorySection />
      <MenuSection />
      <ProcessSection />
      <OriginsSection />
      <JoinSection />
    </>
  );
};

export default HomeContent;
