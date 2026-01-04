import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories.js";

export default function Services() {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
          Leistungen
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Pakete zuerst. Danach Einzelleistungen.
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => navigate(`/zielgruppen/${c.slug}`)}
              className="overflow-hidden rounded-2xl border border-line bg-paper text-left shadow-soft transition hover:shadow-lift"
            >
              <img src={c.image} alt={c.title} className="h-28 w-full object-cover" />
              <div className="p-4">
                <p className="text-sm font-semibold text-ink">{c.title}</p>
                <p className="mt-1 text-xs text-muted">{c.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
