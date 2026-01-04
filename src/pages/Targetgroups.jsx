// src/pages/Targetgroups.jsx
import CategoryTiles from "../components/CategoryTiles.jsx";
import { categories } from "../data/categories.js";

export default function Targetgroups() {
  return (
    <section className="px-4 pt-20 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Einziger, klarer Einstieg */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
          Bereiche
        </p>

        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Wähle den Bereich, in dem du Unterstützung brauchst.
        </h1>

        <p className="mt-4 max-w-xl text-sm text-muted">
          Du startest immer über einen Bereich. Danach zeigen wir dir zuerst passende
          Pakete – und bei Bedarf einzelne Leistungen zur individuellen Zusammenstellung.
        </p>

        {/* Kacheln = Hauptaktion */}
        <div className="mt-12">
          <CategoryTiles categories={categories} />
        </div>
      </div>
    </section>
  );
}
