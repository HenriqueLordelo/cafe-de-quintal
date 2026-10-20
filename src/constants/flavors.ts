import type { Flavor } from "@/types";

export const COFFEE_SHEET = "/images/ingredients.jpg";

export const MATCHA_SHEET = "/images/matcha/ingredients-v2.jpg";

export const DRINK_SIZE = "16 oz";

export const coffeeFlavors: Flavor[] = [
  {
    id: "original",
    name: "Original",
    title: "Kuro Original",
    description:
      "A double shot of our house espresso poured over ice and cold whole milk. Bold, smooth and quietly sweet.",
    notes: ["Dark cocoa", "Toasted almond", "Brown sugar"],
    price: 5.4,
    caffeine: 150,
    scene: "/images/scenes/original.jpg",
    sceneAlt:
      "Iced Kuro Original latte in a clear cup, espresso swirling into cold milk, standing on a mound of ground coffee",
    ingredient: "Roasted coffee beans",
    tile: { sheet: COFFEE_SHEET, col: 0, row: 0 },
  },
  {
    id: "caramel",
    name: "Caramel",
    title: "Salted Caramel",
    description:
      "Slow-cooked caramel stirred into espresso and cold milk, finished with a pinch of flaky sea salt.",
    notes: ["Burnt sugar", "Butterscotch", "Sea salt"],
    price: 5.9,
    caffeine: 150,
    scene: "/images/scenes/caramel-latte.jpg",
    sceneAlt:
      "The same iced latte turned golden amber with caramel stirred through it",
    ingredient: "Salted caramel cubes",
    tile: { sheet: COFFEE_SHEET, col: 1, row: 0 },
  },
  {
    id: "vanilla",
    name: "Vanilla",
    title: "Vanilla Cream",
    description:
      "Madagascar vanilla bean syrup swirled into a mellow espresso latte. Soft, round and creamy.",
    notes: ["Vanilla bean", "Fresh cream", "Wildflower honey"],
    price: 5.7,
    caffeine: 150,
    scene: "/images/scenes/vanilla-latte.jpg",
    sceneAlt:
      "The same iced latte turned pale and creamy with vanilla stirred through it",
    ingredient: "Vanilla pods and orchid",
    tile: { sheet: COFFEE_SHEET, col: 2, row: 0 },
  },
  {
    id: "hazelnut",
    name: "Hazelnut",
    title: "Toasted Hazelnut",
    description:
      "House-roasted hazelnut syrup stirred into espresso and cold milk. Nutty, toasty and smooth.",
    notes: ["Roasted hazelnut", "Praline", "Milk chocolate"],
    price: 5.9,
    caffeine: 150,
    scene: "/images/scenes/hazelnut-latte.jpg",
    sceneAlt:
      "The same iced latte turned a warm tan with hazelnut stirred through it",
    ingredient: "Whole hazelnuts",
    tile: { sheet: COFFEE_SHEET, col: 0, row: 1 },
  },
  {
    id: "mocha",
    name: "Mocha",
    title: "Dark Mocha",
    description:
      "70% dark chocolate melted into a double shot and cold milk. Deep, rich and velvety.",
    notes: ["Dark chocolate", "Black cherry", "Cocoa nib"],
    price: 6.2,
    caffeine: 165,
    scene: "/images/scenes/mocha-latte.jpg",
    sceneAlt:
      "The same iced latte turned deep chocolate brown with dark chocolate stirred through it",
    ingredient: "Dark chocolate pieces",
    tile: { sheet: COFFEE_SHEET, col: 1, row: 1 },
  },
  {
    id: "cinnamon",
    name: "Cinnamon",
    title: "Brown Sugar Cinnamon",
    description:
      "Brown sugar syrup and Ceylon cinnamon shaken with espresso and cold milk. Warm, spiced and mellow.",
    notes: ["Molasses", "Ceylon cinnamon", "Toffee"],
    price: 5.9,
    caffeine: 150,
    scene: "/images/scenes/cinnamon-latte.jpg",
    sceneAlt:
      "The same iced latte turned a warm reddish brown with brown sugar and cinnamon stirred through it",
    ingredient: "Cinnamon sticks",
    tile: { sheet: COFFEE_SHEET, col: 2, row: 1 },
  },
];

export const matchaFlavors: Flavor[] = [
  {
    id: "matcha",
    name: "Original",
    title: "Midori Original",
    description:
      "Ceremonial grade matcha whisked to order and poured over ice and cold milk. Grassy, sweet and silky.",
    notes: ["Fresh grass", "Sweet cream", "Umami"],
    price: 5.9,
    caffeine: 70,
    scene: "/images/matcha/scenes/original.jpg",
    sceneAlt:
      "Iced Midori matcha latte in a clear cup, vivid green matcha swirling into cold milk, standing on a mound of matcha powder",
    ingredient: "Matcha powder and bamboo whisk",
    tile: { sheet: MATCHA_SHEET, col: 0, row: 0 },
  },
  {
    id: "blueberry",
    name: "Blueberry",
    title: "Wild Blueberry",
    description:
      "Wild blueberry compote stirred into cold milk under a layer of whisked matcha. Mellow and berry sweet.",
    notes: ["Wild blueberry", "Vanilla", "Green tea"],
    price: 6.4,
    caffeine: 70,
    scene: "/images/matcha/scenes/blueberry.jpg",
    sceneAlt:
      "The same iced matcha latte with lavender blueberry milk swirling beneath the green",
    ingredient: "Fresh blueberries",
    tile: { sheet: MATCHA_SHEET, col: 2, row: 0 },
  },
  {
    id: "cherry",
    name: "Cherry",
    title: "Dark Cherry",
    description:
      "Dark cherry syrup and a pinch of sakura salt beneath whisked matcha and cold milk.",
    notes: ["Dark cherry", "Sakura", "Almond"],
    price: 6.6,
    caffeine: 70,
    scene: "/images/matcha/scenes/cherry.jpg",
    sceneAlt:
      "The same iced matcha latte with deep cherry red milk swirling beneath the green",
    ingredient: "Dark cherries",
    tile: { sheet: MATCHA_SHEET, col: 1, row: 1 },
  },
  {
    id: "coconut",
    name: "Coconut",
    title: "Coconut Cream",
    description:
      "Toasted coconut milk and a touch of cane sugar make this our creamiest, softest matcha.",
    notes: ["Toasted coconut", "Cane sugar", "Matcha"],
    price: 6.2,
    caffeine: 70,
    scene: "/images/matcha/scenes/coconut.jpg",
    sceneAlt:
      "The same iced matcha latte turned pale and creamy with coconut milk",
    ingredient: "Fresh coconut",
    tile: { sheet: MATCHA_SHEET, col: 2, row: 1 },
  },
  {
    id: "blackberry",
    name: "Blackberry",
    title: "Blackberry Bramble",
    description:
      "Tart blackberries muddled with wildflower honey, layered under matcha and oat milk.",
    notes: ["Blackberry", "Wildflower honey", "Green tea"],
    price: 6.4,
    caffeine: 70,
    scene: "/images/matcha/scenes/blackberry.jpg",
    sceneAlt:
      "The same iced matcha latte with deep plum blackberry milk swirling beneath the green",
    ingredient: "Fresh blackberries",
    tile: { sheet: MATCHA_SHEET, col: 0, row: 1 },
  },
  {
    id: "strawberry",
    name: "Strawberry",
    title: "Strawberry Cloud",
    description:
      "Crushed ripe strawberries and cold milk under a layer of whisked matcha. Bright, jammy and soft.",
    notes: ["Ripe strawberry", "Cream", "Green tea"],
    price: 6.4,
    caffeine: 70,
    scene: "/images/matcha/scenes/strawberry.jpg",
    sceneAlt:
      "The same iced matcha latte with soft pink strawberry milk swirling beneath the green",
    ingredient: "Fresh strawberries",
    tile: { sheet: MATCHA_SHEET, col: 1, row: 0 },
  },
];

/* Every drink from both menus, so the bag can always show what is in it. */
export const ALL_FLAVORS: Flavor[] = [...coffeeFlavors, ...matchaFlavors];
