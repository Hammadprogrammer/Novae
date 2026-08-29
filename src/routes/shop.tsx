import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Menswear — NOVAÉ Clothing" },
      {
        name: "description",
        content: "Browse every NOVAÉ shirt and trouser. Filter by category, size, colour and price in PKR.",
      },
      { property: "og:title", content: "Shop All Menswear — NOVAÉ Clothing" },
      { property: "og:description", content: "Every NOVAÉ shirt and trouser, filterable by size, colour and price." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { q } = Route.useSearch();
  return (
    <Catalog
      products={PRODUCTS}
      eyebrow="The full collection"
      title="Shop all"
      intro="Shirting and trousers for work, weekends and everything in between — filter your way to the right piece."
      initialQuery={q ?? ""}
      key={q ?? ""}
    />
  );
}
