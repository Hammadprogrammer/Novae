import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — NOVAÉ Clothing" },
      {
        name: "description",
        content: "The latest NOVAÉ shirts and trousers, fresh off the Lahore cutting table. Prices in PKR.",
      },
      { property: "og:title", content: "New Arrivals — NOVAÉ Clothing" },
      { property: "og:description", content: "The latest NOVAÉ shirts and trousers, fresh off the cutting table." },
    ],
  }),
  component: () => (
    <Catalog
      products={PRODUCTS.filter((p) => p.isNew)}
      eyebrow="Just landed"
      title="New arrivals"
      intro="Pieces added to the collection this season, in limited runs."
    />
  ),
});
