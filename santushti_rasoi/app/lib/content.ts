export type Product = {
  name: string;
  price: number;
  unit: string;
  category: "traditional" | "halwa" | "dry" | "sugar-free";
  description: string;
  icon: string;
  rating: string;
  badge?: string;
};

export const navLinks = [
  { href: "#categories", label: "Collections" },
  { href: "#process", label: "Craft" },
  { href: "#seasonal", label: "Seasonal" },
  { href: "#dry-sweets", label: "Dry Sweets" },
  { href: "#gifting", label: "Gifting" },
  { href: "#order", label: "Order" },
];

export const products: Product[] = [
  {
    name: "Kesar Kaju Katli",
    price: 850,
    unit: "250g",
    category: "traditional",
    description: "Pure cashew paste with Kashmiri saffron and silver varq.",
    icon: "🥮",
    rating: "★★★★★ (248)",
    badge: "Bestseller",
  },
  {
    name: "Motichoor Ladoo",
    price: 480,
    unit: "500g",
    category: "traditional",
    description: "Tiny gram flour pearls in pure ghee, shaped by hand.",
    icon: "🟠",
    rating: "★★★★★ (182)",
  },
  {
    name: "Pistachio Barfi",
    price: 720,
    unit: "250g",
    category: "dry",
    description: "Iranian pistachios with condensed milk and rose water.",
    icon: "🟩",
    rating: "★★★★☆ (67)",
    badge: "New",
  },
  {
    name: "Gajar Ka Halwa",
    price: 350,
    unit: "500g",
    category: "halwa",
    description: "Winter carrots slow-cooked in desi ghee and milk.",
    icon: "🟧",
    rating: "★★★★★ (310)",
  },
  {
    name: "Besan Ladoo",
    price: 380,
    unit: "500g",
    category: "traditional",
    description: "Roasted gram flour bound with ghee and powdered sugar.",
    icon: "🟡",
    rating: "★★★★★ (204)",
  },
  {
    name: "Sugar Free Khajur Roll",
    price: 520,
    unit: "250g",
    category: "sugar-free",
    description: "Dates and figs stuffed with almonds and walnuts.",
    icon: "🌴",
    rating: "★★★★☆ (89)",
    badge: "Sugar Free",
  },
];

export const faqItems = [
  {
    q: "Do you deliver across India?",
    a: "Yes, we deliver pan India with insulated packaging and tracked shipping.",
  },
  {
    q: "What is the shelf life of your sweets?",
    a: "Dry sweets last 10-25 days, while fresh sweets and halwas have shorter shelf life.",
  },
  {
    q: "Can you make sugar-free sweets?",
    a: "Yes, we offer curated sugar-free options and custom recommendations.",
  },
  {
    q: "Do you offer branded corporate packaging?",
    a: "Yes, for 25+ boxes we provide custom branded packaging and inserts.",
  },
];

export const seasonalData = {
  diwali: {
    name: "The Diwali Diyas Box",
    desc: "8 premium mithais crafted for Diwali in a hand-painted gift box.",
    priceLabel: "₹1,850",
    price: 1850,
    badge: "Diwali 2024",
    icon: "🪔",
  },
  holi: {
    name: "Gulal Mithai Collection",
    desc: "Rose barfi, thandai ladoo, and gulkand pinni in festive packaging.",
    priceLabel: "₹1,450",
    price: 1450,
    badge: "Holi Special",
    icon: "🌈",
  },
  eid: {
    name: "Eid Mubarak Hamper",
    desc: "Dates, dry fruit rolls, and festive sweets for Eid celebrations.",
    priceLabel: "₹2,200",
    price: 2200,
    badge: "Eid 2024",
    icon: "🌙",
  },
  winter: {
    name: "Winter Warmers Box",
    desc: "Gajar halwa, til ladoo, gajak, and peanut chikki favorites.",
    priceLabel: "₹1,100",
    price: 1100,
    badge: "Winter 2024",
    icon: "❄️",
  },
} as const;
