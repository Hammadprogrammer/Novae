import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — NOVAÉ Clothing" },
      { name: "description", content: "The NOVAÉ shirts and trousers you have saved for later." },
      { property: "og:title", content: "Wishlist — NOVAÉ Clothing" },
      { property: "og:description", content: "The NOVAÉ pieces you have saved for later." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, ready } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <p className="label-caps text-accent">Saved pieces</p>
      <h1 className="font-display mt-3 text-5xl">Wishlist</h1>

      {!ready ? null : items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-muted-foreground">You haven&apos;t saved anything yet.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-foreground px-8 py-3 text-[12px] tracking-[0.16em] uppercase text-background transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
