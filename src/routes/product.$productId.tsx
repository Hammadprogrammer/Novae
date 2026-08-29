import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS, SIZE_GUIDE, formatPKR, getProduct } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Piece unavailable — NOVAÉ Clothing" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — NOVAÉ Clothing`;
    const description = `${product.name} in ${product.material}. ${formatPKR(product.price)}, sizes ${product.sizes.join(", ")}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [showGuide, setShowGuide] = useState(false);

  const saved = inWishlist(product.id);
  const related = PRODUCTS.filter(
    (p) => p.subcategory === product.subcategory && p.id !== product.id,
  ).slice(0, 4);

  function add() {
    if (!size) {
      toast.error("Please choose a size first");
      return;
    }
    addToCart({ productId: product.id, size, color, qty });
    toast.success(`${product.name} added to your bag`);
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <nav className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <Link to={product.category === "Shirts" ? "/shirts" : "/pants"} className="hover:text-foreground">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={1000}
            className="aspect-4/5 w-full bg-bone object-cover"
          />
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <img
                key={i}
                src={product.image}
                alt={`${product.name} detail ${i + 1}`}
                width={800}
                height={1000}
                loading="lazy"
                className={cn(
                  "aspect-4/5 w-full bg-bone object-cover",
                  i === 1 && "object-top",
                  i === 2 && "object-bottom",
                )}
              />
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="label-caps text-accent">{product.subcategory}</p>
          <h1 className="font-display mt-3 text-4xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-accent text-accent" />
            {product.rating.toFixed(1)} · {product.reviews} reviews
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl">{formatPKR(product.price)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-base text-muted-foreground line-through">
                  {formatPKR(product.originalPrice)}
                </span>
                <span className="bg-accent/15 px-2 py-1 text-[10px] tracking-[0.16em] uppercase text-accent">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="label-caps text-muted-foreground">Size</span>
              <button
                onClick={() => setShowGuide((v) => !v)}
                className="text-[11px] tracking-[0.14em] uppercase text-accent hover:underline"
              >
                Size guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "size-12 border text-sm transition-colors",
                    size === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            {showGuide && (
              <table className="mt-4 w-full border border-border text-xs">
                <thead className="bg-bone">
                  <tr className="label-caps text-muted-foreground">
                    <th className="px-3 py-2 text-left">Size</th>
                    <th className="px-3 py-2 text-left">Chest (in)</th>
                    <th className="px-3 py-2 text-left">Waist (in)</th>
                    <th className="px-3 py-2 text-left">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((r) => (
                    <tr key={r.size} className="border-t border-border">
                      <td className="px-3 py-2">{r.size}</td>
                      <td className="px-3 py-2">{r.chest}</td>
                      <td className="px-3 py-2">{r.waist}</td>
                      <td className="px-3 py-2">{r.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-7">
            <p className="label-caps mb-3 text-muted-foreground">Colour — {color}</p>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  aria-label={c.name}
                  onClick={() => setColor(c.name)}
                  className={cn(
                    "size-9 rounded-full border transition-all",
                    color === c.name ? "border-foreground ring-1 ring-foreground ring-offset-2" : "border-border",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="px-3 py-3">
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase quantity" className="px-3 py-3">
                <Plus className="size-4" />
              </button>
            </div>
            <button
              onClick={add}
              className="flex-1 bg-foreground py-3 text-[12px] tracking-[0.16em] uppercase text-background transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Add to bag
            </button>
          </div>

          <button
            onClick={() => toggleWishlist(product.id)}
            className="mt-3 flex w-full items-center justify-center gap-2 border border-border py-3 text-[12px] tracking-[0.16em] uppercase transition-colors hover:border-foreground"
          >
            <Heart className={cn("size-4", saved && "fill-accent text-accent")} />
            {saved ? "Saved to wishlist" : "Add to wishlist"}
          </button>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="size-4 text-accent" />
            {product.stock <= 5
              ? `Only ${product.stock} left in this colourway`
              : `In stock — ${product.stock} available`}
            · Delivered in 3–5 days
          </div>

          <dl className="mt-6 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
            <div className="flex justify-between"><dt>Material</dt><dd className="text-foreground">{product.material}</dd></div>
            <div className="flex justify-between"><dt>Care</dt><dd className="text-foreground">{product.care}</dd></div>
            <div className="flex justify-between"><dt>Made in</dt><dd className="text-foreground">Lahore, Pakistan</dd></div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
