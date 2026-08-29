import casualShirtImg from "@/assets/casual-shirt.jpg";
import formalShirtImg from "@/assets/formal-shirt.jpg";
import poloShirtImg from "@/assets/polo-shirt.jpg";
import oversizedShirtImg from "@/assets/oversized-shirt.jpg";
import linenShirtImg from "@/assets/linen-shirt.jpg";
import chinosImg from "@/assets/chinos.jpg";
import formalPantsImg from "@/assets/formal-pants.jpg";
import cargoPantsImg from "@/assets/cargo-pants.jpg";
import jeansImg from "@/assets/jeans.jpg";
import trousersImg from "@/assets/trousers.jpg";

export type Category = "Shirts" | "Pants";

export type Subcategory =
  | "Casual Shirts"
  | "Formal Shirts"
  | "Polo Shirts"
  | "Oversized Shirts"
  | "Linen Shirts"
  | "Chinos"
  | "Formal Pants"
  | "Cargo Pants"
  | "Jeans"
  | "Casual Trousers";

export type ColorOption = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  category: Category;
  subcategory: Subcategory;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: ColorOption[];
  stock: number;
  description: string;
  material: string;
  care: string;
  image: string;
  isNew: boolean;
};

export const ALL_SIZES = ["S", "M", "L", "XL", "XXL"] as const;

export const SUBCATEGORIES: Record<Category, Subcategory[]> = {
  Shirts: [
    "Casual Shirts",
    "Formal Shirts",
    "Polo Shirts",
    "Oversized Shirts",
    "Linen Shirts",
  ],
  Pants: ["Chinos", "Formal Pants", "Cargo Pants", "Jeans", "Casual Trousers"],
};

const IMAGES: Record<Subcategory, string> = {
  "Casual Shirts": casualShirtImg,
  "Formal Shirts": formalShirtImg,
  "Polo Shirts": poloShirtImg,
  "Oversized Shirts": oversizedShirtImg,
  "Linen Shirts": linenShirtImg,
  Chinos: chinosImg,
  "Formal Pants": formalPantsImg,
  "Cargo Pants": cargoPantsImg,
  Jeans: jeansImg,
  "Casual Trousers": trousersImg,
};

const C = {
  ivory: { name: "Ivory", hex: "#EFEADD" },
  white: { name: "Optic White", hex: "#FBFBF8" },
  sky: { name: "Sky", hex: "#AFC6DC" },
  navy: { name: "Midnight Navy", hex: "#1E2A3C" },
  charcoal: { name: "Charcoal", hex: "#33322E" },
  black: { name: "Black", hex: "#17171A" },
  sand: { name: "Sand", hex: "#CDB894" },
  clay: { name: "Clay", hex: "#A5563A" },
  olive: { name: "Olive", hex: "#5B6242" },
  stone: { name: "Stone", hex: "#B4AC9C" },
  indigo: { name: "Indigo", hex: "#2C3A55" },
  sage: { name: "Sage", hex: "#8C9A82" },
  mocha: { name: "Mocha", hex: "#6B5544" },
  wine: { name: "Wine", hex: "#5C2E33" },
} satisfies Record<string, ColorOption>;

type Seed = {
  name: string;
  sub: Subcategory;
  price: number;
  discount: number;
  material: string;
  colors: ColorOption[];
};

const S = (
  name: string,
  sub: Subcategory,
  price: number,
  discount: number,
  material: string,
  colors: ColorOption[],
): Seed => ({ name, sub, price, discount, material, colors });

const SEEDS: Seed[] = [
  // Casual Shirts
  S("Anarkali Cotton Casual Shirt", "Casual Shirts", 4290, 20, "100% combed cotton poplin", [C.sky, C.ivory, C.sage]),
  S("Gulberg Chambray Shirt", "Casual Shirts", 4650, 15, "Cotton chambray, 140 GSM", [C.indigo, C.sky, C.stone]),
  S("Clifton Weekend Shirt", "Casual Shirts", 3990, 0, "Soft-washed cotton twill", [C.olive, C.ivory, C.clay]),
  S("Saddar Half-Sleeve Shirt", "Casual Shirts", 3450, 25, "Breathable cotton voile", [C.white, C.sky, C.sand]),
  S("Murree Flannel Shirt", "Casual Shirts", 5290, 10, "Brushed cotton flannel", [C.wine, C.charcoal, C.olive]),
  S("Bahria Printed Casual Shirt", "Casual Shirts", 4190, 30, "Cotton lawn, digital print", [C.sand, C.sage, C.ivory]),
  S("Zamzama Denim Shirt", "Casual Shirts", 5450, 0, "8oz washed denim", [C.indigo, C.charcoal]),
  S("Kohsar Grandad Collar Shirt", "Casual Shirts", 4390, 18, "Cotton dobby weave", [C.ivory, C.stone, C.navy]),

  // Formal Shirts
  S("Executive Poplin Shirt", "Formal Shirts", 5950, 0, "2-ply Egyptian cotton poplin", [C.white, C.sky, C.ivory]),
  S("Boardroom Twill Shirt", "Formal Shirts", 6250, 15, "Wrinkle-resistant cotton twill", [C.white, C.navy, C.stone]),
  S("Senate Herringbone Shirt", "Formal Shirts", 6890, 20, "Herringbone cotton, 120s", [C.ivory, C.sky]),
  S("Chancery French Cuff Shirt", "Formal Shirts", 7450, 10, "Swiss cotton broadcloth", [C.white, C.ivory]),
  S("Minar Slim Fit Dress Shirt", "Formal Shirts", 5490, 25, "Easy-care cotton blend", [C.white, C.sky, C.charcoal]),
  S("Consulate Satin Stripe Shirt", "Formal Shirts", 6650, 0, "Mercerised cotton satin", [C.navy, C.white]),
  S("Ambassador Oxford Shirt", "Formal Shirts", 5850, 12, "Royal Oxford cotton", [C.sky, C.white, C.stone]),

  // Polo Shirts
  S("Heritage Pique Polo", "Polo Shirts", 3290, 0, "Cotton pique, 220 GSM", [C.navy, C.ivory, C.olive]),
  S("Court Tipped Polo", "Polo Shirts", 3590, 20, "Pima cotton with tipped collar", [C.white, C.navy, C.wine]),
  S("Marina Mercerised Polo", "Polo Shirts", 3890, 15, "Mercerised cotton jersey", [C.sky, C.charcoal, C.sand]),
  S("Fairway Performance Polo", "Polo Shirts", 4190, 25, "Cotton-modal performance knit", [C.sage, C.black, C.white]),
  S("Riviera Long-Sleeve Polo", "Polo Shirts", 4490, 10, "Interlock cotton knit", [C.ivory, C.navy]),
  S("Club Colour-Block Polo", "Polo Shirts", 3750, 30, "Cotton pique with contrast panels", [C.clay, C.navy, C.stone]),

  // Oversized Shirts
  S("Studio Oversized Shirt", "Oversized Shirts", 4950, 0, "Heavyweight cotton twill", [C.sand, C.ivory, C.charcoal]),
  S("Drape Boxy Shirt", "Oversized Shirts", 5290, 20, "Cotton-viscose drape weave", [C.stone, C.black, C.olive]),
  S("Atelier Relaxed Overshirt", "Oversized Shirts", 6450, 15, "Cotton canvas overshirt", [C.olive, C.mocha, C.charcoal]),
  S("Lahore Loose Fit Shirt", "Oversized Shirts", 4790, 25, "Washed cotton poplin", [C.ivory, C.sky]),
  S("Nomad Camp Collar Shirt", "Oversized Shirts", 4590, 10, "Rayon-cotton blend", [C.clay, C.sage, C.sand]),
  S("Terrace Oversized Linen Blend", "Oversized Shirts", 5650, 18, "55% linen, 45% cotton", [C.ivory, C.stone]),

  // Linen Shirts
  S("Haveli Pure Linen Shirt", "Linen Shirts", 6990, 20, "100% European flax linen", [C.ivory, C.sky, C.clay]),
  S("Coast Linen Camp Shirt", "Linen Shirts", 6250, 15, "Washed linen, garment dyed", [C.sand, C.sage, C.white]),
  S("Sahil Linen Blend Shirt", "Linen Shirts", 5450, 0, "60% linen, 40% cotton", [C.stone, C.navy]),
  S("Monsoon Linen Kurta Shirt", "Linen Shirts", 7250, 25, "Slub linen, hand finished", [C.ivory, C.mocha]),
  S("Bazaar Textured Linen Shirt", "Linen Shirts", 6590, 10, "Textured linen weave", [C.clay, C.olive, C.ivory]),
  S("Summit Lightweight Linen Shirt", "Linen Shirts", 5990, 30, "Lightweight 130 GSM linen", [C.white, C.sky]),

  // Chinos
  S("Tailored Slim Chino", "Chinos", 4290, 20, "Stretch cotton twill", [C.sand, C.navy, C.olive]),
  S("Everyday Straight Chino", "Chinos", 3990, 0, "Peached cotton twill", [C.stone, C.charcoal, C.sand]),
  S("Weekend Tapered Chino", "Chinos", 4450, 15, "Cotton-elastane twill", [C.olive, C.mocha]),
  S("Marine Cropped Chino", "Chinos", 4190, 25, "Lightweight cotton twill", [C.sky, C.ivory, C.sand]),
  S("Heritage Pleated Chino", "Chinos", 4890, 10, "Heavy cotton drill", [C.sand, C.charcoal]),
  S("Metro Skinny Chino", "Chinos", 3850, 30, "Four-way stretch cotton", [C.black, C.navy, C.stone]),

  // Formal Pants
  S("Executive Wool Blend Trouser", "Formal Pants", 7450, 0, "Wool-polyester suiting, 250 GSM", [C.charcoal, C.navy, C.black]),
  S("Boardroom Flat Front Pant", "Formal Pants", 6290, 15, "Poly-viscose suiting", [C.charcoal, C.stone]),
  S("Senate Pleated Dress Pant", "Formal Pants", 6850, 20, "Fine twill suiting", [C.navy, C.black]),
  S("Chancery Slim Formal Pant", "Formal Pants", 5990, 25, "Stretch suiting fabric", [C.charcoal, C.navy, C.stone]),
  S("Ambassador Tapered Trouser", "Formal Pants", 7150, 10, "Italian-milled wool blend", [C.black, C.charcoal]),

  // Cargo Pants
  S("Field Utility Cargo", "Cargo Pants", 4990, 20, "Ripstop cotton, 280 GSM", [C.olive, C.charcoal, C.sand]),
  S("Trail Tapered Cargo", "Cargo Pants", 5290, 15, "Cotton-nylon ripstop", [C.sage, C.black]),
  S("Depot Wide Leg Cargo", "Cargo Pants", 5590, 0, "Washed cotton canvas", [C.sand, C.olive, C.mocha]),
  S("Patrol Cargo Jogger", "Cargo Pants", 4590, 30, "Stretch cotton twill", [C.black, C.charcoal, C.olive]),
  S("Expedition Cargo Pant", "Cargo Pants", 5890, 10, "Double-weave cotton", [C.mocha, C.olive]),

  // Jeans
  S("Indigo Slim Fit Jeans", "Jeans", 5490, 20, "12oz stretch denim", [C.indigo, C.black]),
  S("Raw Selvedge Straight Jeans", "Jeans", 7990, 0, "14.5oz raw selvedge denim", [C.indigo]),
  S("Washed Tapered Jeans", "Jeans", 5290, 25, "11oz washed denim", [C.indigo, C.stone]),
  S("Jet Black Skinny Jeans", "Jeans", 4990, 15, "Comfort-stretch black denim", [C.black, C.charcoal]),
  S("Relaxed Vintage Jeans", "Jeans", 5890, 10, "13oz vintage-wash denim", [C.indigo, C.sky]),

  // Casual Trousers
  S("Sunday Drawstring Trouser", "Casual Trousers", 4190, 20, "Cotton-linen blend", [C.ivory, C.stone, C.sage]),
  S("Lounge Pleated Trouser", "Casual Trousers", 4590, 0, "Viscose-cotton drape weave", [C.stone, C.charcoal]),
  S("Studio Wide Leg Trouser", "Casual Trousers", 4890, 25, "Heavy cotton twill", [C.sand, C.black, C.olive]),
  S("Coast Linen Trouser", "Casual Trousers", 5450, 15, "100% linen, garment washed", [C.ivory, C.sand]),
  S("Terrace Knit Trouser", "Casual Trousers", 3990, 30, "Structured cotton knit", [C.charcoal, C.navy, C.stone]),
];

const RATINGS = [4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const PRODUCTS: Product[] = SEEDS.map((seed, i) => {
  const category: Category = SUBCATEGORIES.Shirts.includes(seed.sub) ? "Shirts" : "Pants";
  const originalPrice = seed.discount
    ? Math.round((seed.price / (1 - seed.discount / 100)) / 10) * 10
    : seed.price;
  const sizes = i % 9 === 4 ? ["M", "L", "XL", "XXL"] : [...ALL_SIZES];
  return {
    id: slugify(seed.name),
    name: seed.name,
    category,
    subcategory: seed.sub,
    price: seed.price,
    originalPrice,
    discount: seed.discount,
    rating: RATINGS[(i * 3) % RATINGS.length],
    reviews: 24 + ((i * 37) % 260),
    sizes,
    colors: seed.colors,
    stock: i % 11 === 3 ? 4 : 12 + ((i * 7) % 40),
    description: `${seed.name} — cut and finished in our Lahore atelier from ${seed.material.toLowerCase()}. Considered proportions, clean seams and a hand that softens with every wear. Designed for the Pakistani climate and made to sit right from the first morning.`,
    material: seed.material,
    care: "Machine wash cold on a gentle cycle. Warm iron. Do not tumble dry.",
    image: IMAGES[seed.sub],
    isNew: i % 5 === 0,
  };
});

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const formatPKR = (n: number) =>
  `PKR ${Math.round(n).toLocaleString("en-PK")}`;

export const SIZE_GUIDE = [
  { size: "S", chest: "38", waist: "30", length: "28" },
  { size: "M", chest: "40", waist: "32", length: "29" },
  { size: "L", chest: "42", waist: "34", length: "30" },
  { size: "XL", chest: "44", waist: "36", length: "31" },
  { size: "XXL", chest: "46", waist: "38", length: "32" },
];

export const PAKISTANI_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Sargodha",
  "Bahawalpur",
  "Sukkur",
  "Abbottabad",
  "Mardan",
];

export const COUPONS: Record<string, { type: "percent" | "flat"; value: number; label: string }> = {
  NOVAE10: { type: "percent", value: 10, label: "10% off your order" },
  CONFIDENCE15: { type: "percent", value: 15, label: "15% off your order" },
  FLAT500: { type: "flat", value: 500, label: "PKR 500 off" },
  LINEN20: { type: "percent", value: 20, label: "20% off your order" },
};
