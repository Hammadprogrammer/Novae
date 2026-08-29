import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ALL_SIZES, formatPKR, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  eyebrow: string;
  title: string;
  intro?: string;
  initialQuery?: string;
};

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
  { id: "discount", label: "Biggest Savings" },
] as const;

export function Catalog({ products, eyebrow, title, intro, initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [subs, setSubs] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(8000);
  const [sort, setSort] = useState<string>("featured");
  const [showFilters, setShowFilters] = useState(false);

  const allSubs = useMemo(
    () => Array.from(new Set(products.map((p) => p.subcategory))),
    [products],
  );
  const allColors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors.map((c) => c.name)))).sort(),
    [products],
  );

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = products.filter((p) => {
      if (q && !`${p.name} ${p.subcategory} ${p.material}`.toLowerCase().includes(q)) return false;
      if (subs.length && !subs.includes(p.subcategory)) return false;
      if (sizes.length && !sizes.some((s) => p.sizes.includes(s))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    const sorted = [...result];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "discount") sorted.sort((a, b) => b.discount - a.discount);
    return sorted;
  }, [products, query, subs, sizes, colors, maxPrice, sort]);

  const chip = (active: boolean) =>
    cn(
      "border px-3 py-1.5 text-[11px] tracking-[0.12em] uppercase transition-colors",
      active
        ? "border-foreground bg-foreground text-background"
        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
    );

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <header className="animate-fade-up max-w-2xl">
        <p className="label-caps text-accent">{eyebrow}</p>
        <h1 className="font-display mt-3 text-4xl md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{intro}</p>}
      </header>

      <div className="mt-10 flex flex-wrap items-center gap-4 border-y border-border py-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search this collection"
          className="min-w-[200px] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground"
        >
          <SlidersHorizontal className="size-4" /> Filters
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-border bg-transparent px-3 py-2 text-[11px] tracking-[0.12em] uppercase outline-none"
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>
              Sort: {s.label}
            </option>
          ))}
        </select>
        <span className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
          {filtered.length} pieces
        </span>
      </div>

      {showFilters && (
        <div className="grid gap-8 border-b border-border py-8 md:grid-cols-4">
          <div>
            <p className="label-caps mb-3 text-muted-foreground">Category</p>
            <div className="flex flex-wrap gap-2">
              {allSubs.map((s) => (
                <button key={s} onClick={() => toggle(subs, setSubs, s)} className={chip(subs.includes(s))}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="label-caps mb-3 text-muted-foreground">Size</p>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((s) => (
                <button key={s} onClick={() => toggle(sizes, setSizes, s)} className={chip(sizes.includes(s))}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="label-caps mb-3 text-muted-foreground">Colour</p>
            <div className="flex flex-wrap gap-2">
              {allColors.map((c) => (
                <button key={c} onClick={() => toggle(colors, setColors, c)} className={chip(colors.includes(c))}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="label-caps mb-3 text-muted-foreground">Max price · {formatPKR(maxPrice)}</p>
            <input
              type="range"
              min={3000}
              max={8000}
              step={250}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <button
              onClick={() => {
                setSubs([]);
                setSizes([]);
                setColors([]);
                setMaxPrice(8000);
                setQuery("");
              }}
              className="mt-4 text-[11px] tracking-[0.16em] uppercase text-accent hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-sm text-muted-foreground">
          Nothing matches these filters yet. Try widening your selection.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
