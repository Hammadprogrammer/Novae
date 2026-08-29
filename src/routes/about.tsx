import { createFileRoute, Link } from "@tanstack/react-router";
import atelierImg from "@/assets/atelier.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — NOVAÉ Clothing" },
      {
        name: "description",
        content: "NOVAÉ Clothing is a Lahore menswear house making shirts and trousers with considered fit and fabric.",
      },
      { property: "og:title", content: "Our Story — NOVAÉ Clothing" },
      { property: "og:description", content: "A Lahore menswear house making shirts and trousers with considered fit and fabric." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="label-caps text-accent">Our story</p>
      <h1 className="font-display mt-3 text-5xl">Wear Your Confidence</h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        NOVAÉ began in a two-room workshop in Lahore with a simple frustration: it was easy to buy a
        shirt in Pakistan, and hard to buy one that fit. We started by drafting a single pattern
        block, then re-cutting it fourteen times until the shoulder, chest and cuff sat right on real
        bodies.
      </p>
      <img
        src={atelierImg}
        alt="Fabric being pressed in the NOVAÉ atelier"
        width={1400}
        height={900}
        loading="lazy"
        className="mt-10 aspect-16/10 w-full object-cover"
      />
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Fabric first</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Cotton from mills in Punjab and Sindh, European flax for our linen, and suiting blends
            chosen for how they behave in 40-degree heat. Every fabric is washed and worn before it
            reaches the collection.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl">Finished by hand</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Collars are fused and pressed individually, buttons are hand-checked, and each garment is
            inspected twice before it is folded, wrapped and boxed for delivery.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl">Made for Pakistan</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We ship to every major city, quote in rupees, and accept cash on delivery, Easypaisa,
            JazzCash, bank transfer and card.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl">Fair by design</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Our tailors are salaried, not paid per piece. Slower weeks are still paid weeks — it is
            the only way to keep the standard steady.
          </p>
        </div>
      </div>
      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          to="/shop"
          className="bg-foreground px-7 py-3 text-[12px] tracking-[0.16em] uppercase text-background transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Shop the collection
        </Link>
        <Link
          to="/contact"
          className="border border-foreground px-7 py-3 text-[12px] tracking-[0.16em] uppercase transition-colors hover:bg-foreground hover:text-background"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
