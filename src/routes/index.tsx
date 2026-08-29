import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import atelierImg from "@/assets/atelier.jpg";
import linenImg from "@/assets/linen-shirt.jpg";
import chinosImg from "@/assets/chinos.jpg";
import formalShirtImg from "@/assets/formal-shirt.jpg";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVAÉ Clothing — Wear Your Confidence" },
      {
        name: "description",
        content:
          "Premium Pakistani menswear. Shirts, chinos, linen and trousers cut in Lahore, delivered nationwide in PKR.",
      },
      { property: "og:title", content: "NOVAÉ Clothing — Wear Your Confidence" },
      {
        property: "og:description",
        content: "Premium Pakistani menswear. Shirts and pants cut in Lahore, delivered nationwide.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = PRODUCTS.filter((p) => p.isNew).slice(0, 8);
  const sale = [...PRODUCTS].sort((a, b) => b.discount - a.discount).slice(0, 4);

  return (
    <div>
      <section className="relative">
        <img
          src={heroImg}
          alt="Model wearing an ivory linen shirt and stone trousers"
          width={1600}
          height={1100}
          className="h-[68vh] min-h-[460px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" />
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-14">
            <div className="animate-fade-up max-w-xl text-background">
              <p className="label-caps text-background/70">NOVAÉ Clothing · Lahore</p>
              <h1 className="font-display mt-4 text-5xl leading-[0.95] md:text-7xl">
                Wear Your
                <br />
                Confidence
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-background/80">
                Shirting and trousers built around fit, fabric and the Pakistani climate. Cut in our
                Lahore atelier, delivered to your door.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="bg-background px-7 py-3 text-[12px] tracking-[0.16em] uppercase text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Shop the collection
                </Link>
                <Link
                  to="/new-arrivals"
                  className="border border-background/60 px-7 py-3 text-[12px] tracking-[0.16em] uppercase text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  New arrivals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="label-caps text-accent">The edit</p>
            <h2 className="font-display mt-3 text-4xl">Choose your category</h2>
          </div>
          <Link to="/shop" className="hidden items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground sm:flex">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { to: "/shirts", label: "Shirts", img: formalShirtImg, note: "Casual · Formal · Polo · Linen" },
            { to: "/pants", label: "Pants", img: chinosImg, note: "Chinos · Cargo · Jeans · Formal" },
            { to: "/sale", label: "Sale", img: linenImg, note: "Up to 30% off" },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="group relative overflow-hidden">
              <img
                src={c.img}
                alt={c.label}
                width={800}
                height={1000}
                loading="lazy"
                className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-5 left-5 bg-background/90 px-4 py-3">
                <p className="font-display text-xl">{c.label}</p>
                <p className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground">{c.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-bone">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="label-caps text-accent">Just arrived</p>
              <h2 className="font-display mt-3 text-4xl">New this season</h2>
            </div>
            <Link to="/new-arrivals" className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground">
              See all
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <img
          src={atelierImg}
          alt="Fabric being pressed in the NOVAÉ atelier"
          width={1400}
          height={900}
          loading="lazy"
          className="aspect-4/3 w-full object-cover"
        />
        <div>
          <p className="label-caps text-accent">Our house</p>
          <h2 className="font-display mt-3 text-4xl">Made in Lahore, worn everywhere</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Every NOVAÉ garment starts on a cutting table in Lahore. We work with mills across Punjab
            and Sindh for cotton, and import European flax for our linen, then finish each piece by
            hand before it is folded and boxed.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-block border border-foreground px-7 py-3 text-[12px] tracking-[0.16em] uppercase transition-colors hover:bg-foreground hover:text-background"
          >
            Our story
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="label-caps text-accent">Last chance</p>
            <h2 className="font-display mt-3 text-4xl">On sale now</h2>
          </div>
          <Link to="/sale" className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground">
            Shop sale
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {sale.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
