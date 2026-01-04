import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../data/categories.js";
import { packages } from "../data/packages.js";
import PackageCard from "../components/PackageCard.jsx";

export default function Packages() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("cat") || "all";
  const [filter, setFilter] = useState(initial);

  const filtered = useMemo(() => {
    if (filter === "all") return packages;
    return packages.filter((p) => p.category === filter);
  }, [filter]);

  function setCat(v) {
    setFilter(v);
    if (v === "all") params.delete("cat");
    else params.set("cat", v);
    setParams(params, { replace: true });
  }

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
          Pakete
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Produktkatalog – wähle ein Paket.
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted">
          Lorem ipsum dolor sit amet. Pakete zuerst – Einzelleistungen ergänzen.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <Chip active={filter === "all"} onClick={() => setCat("all")}>
            Alle
          </Chip>
          {categories.map((c) => (
            <Chip key={c.slug} active={filter === c.slug} onClick={() => setCat(c.slug)}>
              {c.title}
            </Chip>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {filtered.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
        active
          ? "border-ink bg-ink text-paper shadow-soft"
          : "border-line bg-paper text-ink hover:bg-panel"
      }`}
    >
      {children}
    </button>
  );
}
