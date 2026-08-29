import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/sale")({
  head: () => ({
    meta: [
      { title: "Sale — Up to 30% Off | NOVAÉ Clothing" },
      {
        name: "description",
        content: "Reduced NOVAÉ shirts and trousers, up to 30% off. Sizes S to XXL, prices in PKR.",
      },
      { property: "og:title", content: "Sale — Up to 30% Off | NOVAÉ Clothing" },
      { property: "og:description", content: "Reduced NOVAÉ shirts and trousers, up to 30% off." },
    ],
  }),
  component: () => (
    <Catalog
      products={PRODUCTS.filter((p) => p.discount > 0).sort((a, b) => b.discount - a.discount)}
      eyebrow="Reduced"
      title="Sale"
      intro="Season-end pricing on selected shirting and trousers, while sizes last."
    />
  ),
});
