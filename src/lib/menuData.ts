// Menu catalog — the source of truth for category tabs + items shown on
// the Browse Menu screen and the item detail / customization screen.
import type { FoodKey } from "./foodImages";

export type MenuItem = {
  slug: string;
  name: string;
  description: string;
  priceGBP: number;
  kcal?: number;
  image: FoodKey;
  /** ingredients that can be toggled off on the item screen */
  removables?: string[];
  /** sizes / extras the customer can pick to bump the price */
  extras?: { id: string; label: string; deltaGBP: number }[];
  tag?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const CATEGORIES: MenuCategory[] = [
  {
    id: "burgers",
    label: "Smashed Burgers",
    items: [
      {
        slug: "superstar",
        name: "Superstar",
        description:
          "Two patties, Star sauce, cheese, tomato, lettuce, sesame brioche bun.",
        priceGBP: 8.5,
        kcal: 833,
        image: "smash",
        removables: ["Cheese", "Lettuce", "Tomatoes", "Sauce"],
        extras: [
          { id: "add-patty", label: "Add patty", deltaGBP: 2.5 },
          { id: "add-bacon", label: "Add bacon", deltaGBP: 1.5 },
          { id: "add-jal", label: "Jalapeños", deltaGBP: 0.5 },
        ],
        tag: "★ Fan favourite",
      },
      {
        slug: "the-good-burger",
        name: "The Good Burger",
        description:
          "Three patties, Good sauce, cheese, pickles, red onions, tomato, lettuce, sesame brioche bun.",
        priceGBP: 12.0,
        kcal: 1024,
        image: "burgers",
        removables: ["Cheese", "Pickles", "Red Onions", "Tomatoes", "Lettuce"],
        extras: [
          { id: "add-patty", label: "Add patty", deltaGBP: 2.5 },
          { id: "double-cheese", label: "Double cheese", deltaGBP: 1.2 },
        ],
      },
      {
        slug: "route-66",
        name: "Route 66",
        description:
          "Two patties, turkey bacon, smoked cheddar, hash brown, BBQ glaze, brioche.",
        priceGBP: 10.5,
        kcal: 952,
        image: "combo",
        removables: ["Cheese", "Hash Brown", "BBQ Sauce"],
      },
      {
        slug: "pink-sauce-smash",
        name: "Pink Sauce Smash",
        description:
          "Double smash, pink sauce, crispy onions, American cheese, dill pickles.",
        priceGBP: 9.5,
        kcal: 880,
        image: "pink",
        removables: ["Cheese", "Pickles", "Crispy Onions", "Pink Sauce"],
      },
    ],
  },
  {
    id: "little",
    label: "Little Archie's",
    items: [
      {
        slug: "lil-cheeseburger",
        name: "Lil' Cheeseburger",
        description: "Single patty, American cheese, ketchup, soft bun.",
        priceGBP: 4.95,
        kcal: 410,
        image: "nuggets",
      },
      {
        slug: "kids-nuggets",
        name: "Lil' Nuggets · 4pc",
        description: "Crispy chicken nuggets, choice of dip.",
        priceGBP: 4.5,
        kcal: 320,
        image: "nuggets",
      },
    ],
  },
  {
    id: "chicken",
    label: "Chicken",
    items: [
      {
        slug: "hot-honey-crispy",
        name: "Hot Honey Crispy",
        description: "Buttermilk fried chicken, hot honey glaze, slaw, brioche.",
        priceGBP: 9.25,
        kcal: 760,
        image: "honey",
        removables: ["Slaw", "Hot Honey"],
        extras: [{ id: "extra-honey", label: "Extra hot honey", deltaGBP: 0.5 }],
        tag: "🔥 Trending",
      },
      {
        slug: "tenders-3pc",
        name: "Tenders · 3pc",
        description: "Hand-breaded tenders, choose your dip.",
        priceGBP: 6.95,
        kcal: 520,
        image: "tenders",
      },
      {
        slug: "pink-sauce-wings",
        name: "Pink Sauce Wings",
        description:
          "6 wings tossed in the famous pink sauce, served with celery.",
        priceGBP: 8.95,
        kcal: 690,
        image: "wings",
      },
    ],
  },
  {
    id: "shakes",
    label: "Shakes",
    items: [
      {
        slug: "salted-caramel-shake",
        name: "Salted Caramel Shake",
        description:
          "Hand-spun vanilla, salted caramel, whipped cream, toffee sprinkles.",
        priceGBP: 4.95,
        kcal: 540,
        image: "shake",
        extras: [
          { id: "extra-shot", label: "Extra caramel", deltaGBP: 0.5 },
          { id: "vegan", label: "Make it vegan", deltaGBP: 0.7 },
        ],
      },
      {
        slug: "og-milkshake",
        name: "OG Milkshake",
        description: "Old-school vanilla or strawberry, hand-spun to order.",
        priceGBP: 4.5,
        kcal: 470,
        image: "milkshake",
      },
    ],
  },
  {
    id: "sides",
    label: "Sides",
    items: [
      {
        slug: "curly-fries",
        name: "Curly Fries · Large",
        description: "Seasoned curly fries with the secret diner dust.",
        priceGBP: 3.2,
        kcal: 410,
        image: "curly",
      },
      {
        slug: "loaded-curly",
        name: "Loaded Curly",
        description: "Curly fries, cheese sauce, crispy bacon, pink sauce drizzle.",
        priceGBP: 5.5,
        kcal: 620,
        image: "fries",
        removables: ["Bacon", "Pink Sauce", "Cheese Sauce"],
      },
    ],
  },
  {
    id: "late",
    label: "Late Night",
    items: [
      {
        slug: "witching-hour-combo",
        name: "Witching Hour Combo",
        description:
          "Triple smash, loaded curly, OG shake — only after midnight.",
        priceGBP: 14.95,
        kcal: 1480,
        image: "late",
        tag: "🌙 After 23:00",
      },
    ],
  },
  {
    id: "secret",
    label: "Secret Menu",
    items: [
      {
        slug: "secret-stack",
        name: "The Secret Stack",
        description: "If you know, you know. Tier 02+ members only.",
        priceGBP: 13.5,
        image: "secret",
        tag: "★ Members only",
      },
    ],
  },
];

export const CATEGORY_TONES: Record<string, "pink" | "blush" | "cream" | "night" | "deep"> = {
  burgers: "pink",
  little: "blush",
  chicken: "deep",
  shakes: "cream",
  sides: "blush",
  late: "night",
  secret: "deep",
};

export function findItem(slug: string): MenuItem | undefined {
  for (const c of CATEGORIES) {
    const m = c.items.find((i) => i.slug === slug);
    if (m) return m;
  }
  return undefined;
}

export function findCategory(id: string): MenuCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
