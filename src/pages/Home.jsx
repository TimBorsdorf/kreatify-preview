import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../data/categories.js";
import { packages } from "../data/packages.js";
import CategoryTiles from "../components/CategoryTiles.jsx";
import PackageCard from "../components/PackageCard.jsx";

export default function Home() {
  const navigate = useNavigate();

  const popular = useMemo(
    () => packages.filter((p) => p.popular).slice(0, 3),
    []
  );

  return (
    <div>
      {/* HERO (textbasiert, ruhig) */}
      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
            Strategie · Content · Design
          </p>

          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Persönlich, messbar, kreativ –{" "}
            <span className="text-ink/70">mit klaren Paketen statt Chaos.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Kein anonymer Checkout –
            wir beraten dich persönlich und finden das passende Paket.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/anfrage")}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-paper shadow-soft transition hover:opacity-90"
            >
              Projekt starten <span className="text-sm">↗</span>
            </button>

            <a
              href="#beratung"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-panel"
            >
              Beratung anfragen
            </a>

            <a
              href="https://wa.me/491234567890?text=Hi!%20Ich%20m%C3%B6chte%20ein%20Projekt%20anfragen."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-panel"
            >
              WhatsApp <span className="text-sm">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ZIELGRUPPEN (Haupteinstieg) */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                Einstieg
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Wähle deine Zielgruppe – wir führen dich zum passenden Paket.
              </h2>
            </div>

            <Link
              to="/zielgruppen"
              className="hidden rounded-full border border-line bg-paper px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-panel md:inline-flex"
            >
              Alle Zielgruppen
            </Link>
          </div>

          <div className="mt-8">
            <CategoryTiles categories={categories} />
          </div>
        </div>
      </section>

      {/* BELIEBTE PAKETE (max. 3) */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                Beliebte Pakete
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Pakete geben Sicherheit.
              </h2>
              <p className="mt-2 text-sm text-muted">
                Lorem ipsum dolor sit amet – klarer Umfang, klarer Preis, klarer Ablauf.
              </p>
            </div>

            <Link
              to="/pakete"
              className="hidden rounded-full border border-line bg-paper px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-panel md:inline-flex"
            >
              Alle Pakete
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {popular.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>

      {/* WARUM (3 Punkte) */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
            Warum Kreatify
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Persönlich statt anonym",
                d: "Kein Checkout. Wir sprechen kurz und klären, was du wirklich brauchst.",
              },
              {
                t: "Klarer Umfang",
                d: "Pakete sind vordefiniert – du weißt, was drin ist und was es kostet.",
              },
              {
                t: "Erweiterbar",
                d: "Einzelleistungen ergänzen Pakete, wenn du etwas Spezifisches brauchst.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-line bg-paper p-5 shadow-soft">
                <p className="text-sm font-semibold text-ink">{x.t}</p>
                <p className="mt-2 text-sm text-muted">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABLAUF (3 Schritte) */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
            Ablauf
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { n: "01", t: "Paket wählen", d: "Zielgruppe öffnen und ein Paket auswählen." },
              { n: "02", t: "Kurz anfragen", d: "Ziel, Zeitraum, Budget – in 1 Minute." },
              { n: "03", t: "Persönlich sprechen", d: "Wir melden uns und stimmen alles ab." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-line bg-panel p-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                  {s.n}
                </div>
                <div className="mt-2 text-sm font-semibold text-ink">{s.t}</div>
                <div className="mt-2 text-sm text-muted">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT CTA */}
      <section id="beratung" className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-line bg-paper p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">
                Unsicher? Wir beraten dich persönlich.
              </p>
              <p className="mt-1 text-sm text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/491234567890?text=Hi!%20Ich%20m%C3%B6chte%20ein%20Projekt%20anfragen."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-panel"
              >
                WhatsApp <span className="text-sm">↗</span>
              </a>

              <button
                onClick={() => navigate("/kontakt")}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-panel"
              >
                Rückruf / Kontakt
              </button>

              <button
                onClick={() => navigate("/anfrage")}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-paper shadow-soft transition hover:opacity-90"
              >
                Projekt starten <span className="text-sm">↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
