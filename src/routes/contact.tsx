import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NOVAÉ Clothing" },
      {
        name: "description",
        content: "Reach the NOVAÉ Clothing team in Lahore for orders, sizing help, exchanges and wholesale.",
      },
      { property: "og:title", content: "Contact — NOVAÉ Clothing" },
      { property: "og:description", content: "Reach the NOVAÉ team in Lahore for orders, sizing and exchanges." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email";
    if (form.message.trim().length < 10) next.message = "Please tell us a little more";
    setErrors(next);
    if (Object.keys(next).length) return;
    toast.success("Message sent — our team replies within one business day.");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  const field =
    "w-full border border-border bg-card px-4 py-3 text-sm outline-none focus:border-accent";

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="label-caps text-accent">Get in touch</p>
      <h1 className="font-display mt-3 text-5xl">Contact</h1>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label-caps mb-2 block text-muted-foreground">Name</label>
            <input
              className={field}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label className="label-caps mb-2 block text-muted-foreground">Email</label>
            <input
              className={field}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
          <div>
            <label className="label-caps mb-2 block text-muted-foreground">Subject</label>
            <input
              className={field}
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>
          <div>
            <label className="label-caps mb-2 block text-muted-foreground">Message</label>
            <textarea
              rows={6}
              className={field}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="bg-foreground px-8 py-3 text-[12px] tracking-[0.16em] uppercase text-background transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Send message
          </button>
        </form>

        <aside className="space-y-8 text-sm text-muted-foreground">
          <div>
            <p className="label-caps mb-2 text-accent">Studio</p>
            <p>Block C, DHA Phase 6</p>
            <p>Lahore, Punjab 54792</p>
          </div>
          <div>
            <p className="label-caps mb-2 text-accent">Customer care</p>
            <p>+92 300 000 0000</p>
            <p>care@novae.pk</p>
          </div>
          <div>
            <p className="label-caps mb-2 text-accent">Hours</p>
            <p>Monday to Saturday, 10am – 8pm PKT</p>
          </div>
          <div>
            <p className="label-caps mb-2 text-accent">Exchanges</p>
            <p>Free size exchange within 14 days in Karachi, Lahore and Islamabad.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
