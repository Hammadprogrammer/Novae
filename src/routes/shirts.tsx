import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/shirts")({
  head: () => ({
    meta: [
      { title: "Men's Shirts — Casual, Formal, Linen | NOVAÉ Clothing" },
      {
        name: "description",
        content: "Casual, formal, polo, oversized and linen shirts cut in Lahore. Sizes S to XXL, prices in PKR.",
      },
      { property: "og:title", content: "Men's Shirts — NOVAÉ Clothing" },
      { property: "og:description", content: "Casual, formal, polo, oversized and linen shirts, sizes S to XXL." },
    ],
  }),
  component: () => (
    <Catalog
      products={PRODUCTS.filter((p) => p.category === "Shirts")}
      eyebrow="Shirting"
      title="Shirts"
      intro="Poplin, oxford, chambray and pure flax linen — collars that hold, shoulders that sit."
    />
  ),
});
