import { useNavigate } from "react-router-dom";

export default function PackageCard({ pkg }) {
  const navigate = useNavigate();

  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-paper shadow-soft transition hover:shadow-lift">
      <div className="h-44 overflow-hidden bg-panel">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-ink">{pkg.title}</h3>
            <p className="mt-1 text-xs text-muted">{pkg.short}</p>
          </div>
          <span className="rounded-full border border-line bg-panel px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">
            {pkg.priceFrom}
          </span>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-ink/80">
          {pkg.features.slice(0, 3).map((f) => (
            <li key={f} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate(`/anfrage?package=${pkg.id}`)}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper shadow-soft transition hover:opacity-90"
        >
          Projekt starten <span className="text-sm">↗</span>
        </button>
      </div>
    </article>
  );
}
