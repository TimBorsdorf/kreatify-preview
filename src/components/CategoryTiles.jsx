import { Link } from "react-router-dom";

export default function CategoryTiles({ categories }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {categories.map((c) => (
        <Link
          key={c.slug}
          to={`/zielgruppen/${c.slug}`}
          className="group overflow-hidden rounded-2xl border border-line bg-paper shadow-soft transition hover:shadow-lift"
        >
          <div className="h-36 overflow-hidden bg-panel">
            <img
              src={c.image}
              alt={c.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-4">
            <p className="text-sm font-semibold text-ink">{c.title}</p>
            <p className="mt-1 text-xs text-muted">{c.subtitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
