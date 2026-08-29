import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { formatPKR, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, inWishlist } = useStore();
  const saved = inWishlist(product.id);

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-bone">
        <Link to="/product/$productId" params={{ productId: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={1000}
            loading="lazy"
            className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.discount > 0 && (
            <span className="bg-accent px-2 py-1 text-[10px] tracking-[0.16em] uppercase text-accent-foreground">
              −{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-ink px-2 py-1 text-[10px] tracking-[0.16em] uppercase text-background">
              New
            </span>
          )}
        </div>
        <button
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 grid size-9 place-items-center border border-border bg-background/85 transition-colors hover:border-accent"
        >
          <Heart className={cn("size-4", saved ? "fill-accent text-accent" : "text-foreground/60")} />
        </button>
      </div>

      <div className="pt-4">
        <p className="label-caps text-muted-foreground">{product.subcategory}</p>
        <Link
          to="/product/$productId"
          params={{ productId: product.id }}
          className="font-display mt-1 block text-lg leading-snug hover:text-accent"
        >
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3 fill-accent text-accent" />
          {product.rating.toFixed(1)} · {product.reviews} reviews
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-medium">{formatPKR(product.price)}</span>
          {product.discount > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPKR(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="size-3.5 rounded-full border border-border"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
          <span className="text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
            {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}
          </span>
        </div>
      </div>
    </article>
  );
}
