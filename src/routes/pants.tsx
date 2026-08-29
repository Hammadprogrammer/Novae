import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/pants")({
  head: () => ({
    meta: [
      { title: "Men's Pants — Chinos, Jeans, Cargo | NOVAÉ Clothing" },
      {
        name: "description",
        content: "Chinos, formal pants, cargo trousers and denim tailored in Lahore. Sizes S to XXL, prices in PKR.",
      },
      { property: "og:title", content: "Men's Pants — NOVAÉ Clothing" },
      { property: "og:description", content: "Chinos, formal pants, cargo trousers and denim, sizes S to XXL." },
    ],
  }),
  component: () => (
    <Catalog
      products={PRODUCTS.filter((p) => p.category === "Pants")}
      eyebrow="Trousers"
      title="Pants"
      intro="From boardroom wool blends to weekend cargo — cut clean through the leg."
    />
  ),
});
