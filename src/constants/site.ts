import type { NavLink, SiteConfig } from "@/types";
import { getOrigin } from "@/lib/window";

export const siteConfig: SiteConfig = {
  name: "Kuro",
  description:
    "Kuro pours small-batch iced lattes in six signature flavors, from the house Original to salted caramel, vanilla cream, toasted hazelnut, dark mocha and brown sugar cinnamon.",
  placeholder:
    "Your new site will appear right here. Just ask Modulify to generate anything you can describe.",
  url: getOrigin(),
  ogImage: "/images/scenes/original.jpg",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "How it's made", href: "#process" },
  { label: "Origins", href: "#origins" },
  { label: "Join the list", href: "#join" },
];
