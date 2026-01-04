import CategoryTiles from "../components/CategoryTiles.jsx";
import { categories } from "../data/categories.js";

export default function Targetgroups() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
          Zielgruppen
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Wähle den Bereich, der zu dir passt.
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted">
          Lorem ipsum dolor sit amet. Danach siehst du zuerst passende Pakete – dann Einzelleistungen.
        </p>

        <div className="mt-10">
          <CategoryTiles categories={categories} />
        </div>
      </div>
    </section>
  );
}
