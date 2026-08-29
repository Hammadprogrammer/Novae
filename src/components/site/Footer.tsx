import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-bone">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl font-semibold tracking-[0.22em]">NOVAÉ</div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Wear Your Confidence. Shirting and trousers cut in Lahore for the way Pakistan dresses now.
          </p>
        </div>
        <div>
          <p className="label-caps mb-4 text-accent">Shop</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shirts" className="hover:text-foreground">Shirts</Link></li>
            <li><Link to="/pants" className="hover:text-foreground">Pants</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-foreground">New Arrivals</Link></li>
            <li><Link to="/sale" className="hover:text-foreground">Sale</Link></li>
          </ul>
        </div>
        <div>
          <p className="label-caps mb-4 text-accent">Account</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/wishlist" className="hover:text-foreground">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-foreground">Cart</Link></li>
            <li><Link to="/orders" className="hover:text-foreground">Orders</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="label-caps mb-4 text-accent">Delivery &amp; Payment</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Karachi · Lahore · Islamabad · Faisalabad · Multan · Peshawar · Quetta
          </p>
          <p className="mt-3 text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            COD · Easypaisa · JazzCash · Bank Transfer · Card
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-5 py-4 text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
          <span>© {new Date().getFullYear()} NOVAÉ Clothing</span>
          <span>All prices in PKR</span>
        </div>
      </div>
    </footer>
  );
}
