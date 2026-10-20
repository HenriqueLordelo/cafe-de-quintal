import type { FC, ReactNode } from "react";

import { Seo } from "@/components/generals/seo";
import { Layout } from "@/components/generals/layout";
import HomeContent from "@/components/landing/home-content";
import SiteHeader from "@/components/landing/site-header";
import { SiteProvider } from "@/components/landing/site-provider";
import { siteConfig } from "@/constants/site";

const Home: FC = (): ReactNode => {
  return (
    <SiteProvider>
      <Layout header={<SiteHeader />}>
        <Seo ogImage={siteConfig.ogImage} />

        <HomeContent />
      </Layout>
    </SiteProvider>
  );
};

export default Home;
