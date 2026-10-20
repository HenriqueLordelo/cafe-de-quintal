import type { Brand, BrandId } from "@/types";

import { Bean, Coffee, Leaf, Mountain, Sprout } from "lucide-react";

import { coffeeFlavors, matchaFlavors } from "@/constants/flavors";

/* The menu the site opens with. Visitors can switch, and their choice is remembered. */
export const DEFAULT_BRAND: BrandId = "coffee";

export const BRAND_ORDER: BrandId[] = ["coffee", "matcha"];

export const BRAND_STORAGE_KEY = "kuro-brand";

const SIZES = ["12 oz", "16 oz", "20 oz"];

const SWEETNESS = ["Full", "Half", "Unsweetened"];

export const BRANDS: Record<BrandId, Brand> = {
  coffee: {
    id: "coffee",
    label: "Coffee",
    wordmark: "kuro",
    company: "Kuro Coffee",
    drink: "coffee",
    tagline: "Small-batch iced lattes, poured black first.",
    icon: Coffee,
    markIcon: Bean,
    originIcon: Mountain,
    flavors: coffeeFlavors,
    story: {
      title: "Kuro means black. The rest is up to you.",
      paragraphs: [
        "We started with one stubborn idea: a perfect black espresso is the foundation of every great iced latte. So we roast two single origin coffees in small batches and pull every shot to order.",
        "Then we make our flavors the slow way, every morning, from real caramel, real vanilla bean, toasted hazelnuts and dark chocolate. Pick one above, or keep it classic. Either way, it starts black.",
      ],
      image: "/images/story/bean.jpg",
      imageAlt: "A single dark roasted coffee bean",
      badgeValue: "7 days",
      badgeLabel: "Every roast rests before we brew it",
      stats: [
        { value: "2", label: "Single origins, roasted every week" },
        { value: "6", label: "Flavors made in house each morning" },
        { value: "0", label: "Powders or artificial syrups" },
      ],
    },
    menu: {
      title: "Six iced lattes. One perfect shot.",
      description:
        "Every drink starts with a double shot of Kuro espresso over ice and cold milk, then one of our house-made flavors.",
    },
    options: [
      { label: "Milk", values: ["Whole", "Oat", "Almond"] },
      { label: "Sweetness", values: SWEETNESS },
      { label: "Size", values: SIZES },
    ],
    process: {
      title: "From green bean to your cup in four careful steps.",
      steps: [
        {
          title: "Roast",
          text: "Every Tuesday we roast small batches to a deep medium-dark, chasing cocoa sweetness without the bitterness.",
          image: "/images/process/roast.jpg",
          alt: "Six coffee beans in a row, from pale green to dark roasted",
        },
        {
          title: "Rest",
          text: "Fresh beans rest for seven days so the gases settle and every shot pulls smooth and balanced.",
          image: "/images/process/rest.jpg",
          alt: "Roasted coffee beans poured into a golden coffee bag",
        },
        {
          title: "Pull",
          text: "Each drink gets its own double shot, pulled to order with 18 grams in and 36 grams out.",
          image: "/images/process/pull.jpg",
          alt: "Espresso dripping from a portafilter spout",
        },
        {
          title: "Pour",
          text: "The shot meets ice, cold milk and a house-made flavor, then goes straight into your hand.",
          image: "/images/process/pour.jpg",
          alt: "Milk being poured into a glass of iced coffee",
        },
      ],
    },
    origins: {
      title: "Two origins, blended for depth.",
      description:
        "Our house espresso pairs a chocolate-heavy Colombian with a bright, floral Ethiopian, so it holds its own under milk, ice and every flavor on the menu.",
      items: [
        {
          region: "Huila",
          country: "Colombia",
          share: "60% of the blend",
          description:
            "Grown around 1,700 meters on the Andean slopes of southern Colombia, this washed coffee gives the blend its cocoa backbone and a long caramel finish.",
          contourAt: "85% 115%",
          facts: [
            { label: "Altitude", value: "1,700 m" },
            { label: "Process", value: "Washed" },
            { label: "Notes", value: "Cocoa, red apple" },
          ],
        },
        {
          region: "Sidama",
          country: "Ethiopia",
          share: "40% of the blend",
          description:
            "From smallholder farms near 2,000 meters, this natural process coffee adds a lift of jasmine and blueberry that keeps every latte bright.",
          contourAt: "15% -15%",
          facts: [
            { label: "Altitude", value: "2,000 m" },
            { label: "Process", value: "Natural" },
            { label: "Notes", value: "Jasmine, blueberry" },
          ],
        },
      ],
    },
  },
  matcha: {
    id: "matcha",
    label: "Matcha",
    wordmark: "midori",
    company: "Midori Matcha",
    drink: "matcha",
    tagline: "Ceremonial matcha, whisked to order.",
    icon: Leaf,
    markIcon: Leaf,
    originIcon: Sprout,
    flavors: matchaFlavors,
    story: {
      title: "Midori means green. We take that seriously.",
      paragraphs: [
        "Our matcha comes from shaded tea gardens in Uji and Nishio, stone-milled into a fine, vivid powder just weeks before it reaches the counter.",
        "We whisk every cup to order and pair it with real fruit, never syrup from a bottle. Pick a flavor above, or keep it pure. Either way, it starts green.",
      ],
      image: "/images/matcha/story/matcha-latte.jpg",
      imageAlt: "An iced matcha latte in a clear glass with a straw",
      badgeValue: "21 days",
      badgeLabel: "Our tea grows in shade before harvest",
      stats: [
        { value: "2", label: "Tea gardens in Japan we source from" },
        { value: "6", label: "Fruit pairings made fresh each morning" },
        { value: "0", label: "Added colors or powdered mixes" },
      ],
    },
    menu: {
      title: "Six iced matchas. One perfect whisk.",
      description:
        "Every drink starts with ceremonial matcha whisked to order over ice and cold milk, then one of our fresh fruit pairings.",
    },
    options: [
      { label: "Milk", values: ["Whole", "Oat", "Coconut"] },
      { label: "Sweetness", values: SWEETNESS },
      { label: "Size", values: SIZES },
    ],
    process: {
      title: "From shaded leaf to your cup in four careful steps.",
      steps: [
        {
          title: "Shade",
          text: "For three weeks before harvest the tea bushes grow under shade cloth, which deepens their color and sweetness.",
          image: "/images/matcha/process/shade.jpg",
          alt: "Rows of tea bushes under black shade cloth on a hillside in Japan",
        },
        {
          title: "Grind",
          text: "The dried leaves are slowly stone-milled, about 40 grams an hour, into a silky, vivid powder.",
          image: "/images/matcha/process/grind.jpg",
          alt: "A wooden scoop of bright green matcha powder over a glass of matcha",
        },
        {
          title: "Whisk",
          text: "Each drink gets two grams of matcha whisked by hand with a bamboo whisk until smooth and foamy.",
          image: "/images/matcha/process/whisk.jpg",
          alt: "Hands whisking matcha in a ceramic bowl with a bamboo whisk",
        },
        {
          title: "Pour",
          text: "The matcha meets ice, cold milk and a fresh fruit pairing, then goes straight into your hand.",
          image: "/images/matcha/process/pour.jpg",
          alt: "An iced matcha latte in a glass with a glass straw",
        },
      ],
    },
    origins: {
      title: "Two gardens, blended for balance.",
      description:
        "We pair a deep, savory Uji matcha with a brighter Nishio harvest, so every drink stays vivid under milk, ice and fruit.",
      items: [
        {
          region: "Uji",
          country: "Kyoto, Japan",
          share: "60% of the blend",
          description:
            "Grown in the misty hills south of Kyoto, where tea has been shaded and stone-milled for centuries, Uji matcha gives the blend its deep umami and creamy body.",
          contourAt: "85% 115%",
          facts: [
            { label: "Harvest", value: "First flush" },
            { label: "Shading", value: "21 days" },
            { label: "Notes", value: "Umami, sweet grass" },
          ],
        },
        {
          region: "Nishio",
          country: "Aichi, Japan",
          share: "40% of the blend",
          description:
            "From the river plains of Aichi, Nishio matcha adds a bright jade color and a clean, lightly floral finish that stays vivid under fruit.",
          contourAt: "15% -15%",
          facts: [
            { label: "Harvest", value: "First flush" },
            { label: "Shading", value: "20 days" },
            { label: "Notes", value: "Floral, sweet pea" },
          ],
        },
      ],
    },
  },
};
