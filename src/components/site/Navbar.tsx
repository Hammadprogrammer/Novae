import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useStore } from "@/lib/store";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shirts", label: "Shirts" },
  { to: "/pants", label: "Pants" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/sale", label: "Sale" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { cartCount, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = term.trim();
    setSearchOpen(false);
    setOpen(false);
    navigate({ to: "/shop", search: q ? { q } : {} });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="bg-ink text-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-[11px] tracking-[0.16em] uppercase">
          <span>Cash on delivery nationwide</span>
          <span className="hidden sm:inline">Complimentary delivery over PKR 8,000</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4">
        <button
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link to="/" className="shrink-0">
          <span className="font-display text-2xl font-semibold tracking-[0.22em]">NOVAÉ</span>
        </Link>

        <nav className="hidden items-center gap-7 text-[12px] tracking-[0.14em] uppercase lg:flex">
          {LINKS.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-muted-foreground transition-colors hover:text-accent"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" onClick={() => setSearchOpen((v) => !v)}>
            <Search className="size-[18px]" />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="relative">
            <Heart className="size-[18px]" />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-accent text-[10px] text-accent-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingBag className="size-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-accent text-[10px] text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={submitSearch} className="border-t border-border bg-card px-5 py-4">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <Search className="size-4 text-muted-foreground" />
            <input
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search shirts, chinos, linen…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" className="label-caps text-accent">
              Search
            </button>
          </div>
        </form>
      )}

      {open && (
        <nav className="border-t border-border bg-card px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3 text-sm tracking-[0.12em] uppercase">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-1 text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/orders" onClick={() => setOpen(false)} className="py-1 text-muted-foreground">
              Orders
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
