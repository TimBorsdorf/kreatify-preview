// src/pages/Home.jsx
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../data/categories.js";
import { packages } from "../data/packages.js";
import CategoryTiles from "../components/CategoryTiles.jsx";
import PackageCard from "../components/PackageCard.jsx";

export default function Home() {
  const navigate = useNavigate();

  // Beliebte Pakete (Preview max. 3)
  const popular = useMemo(
    () => packages.filter((p) => p.popular).slice(0, 3),
    []
  );

  return (
    <div>
      {/* HERO (textbasiert, ruhig) */}
      <section className="px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
            Strategie · Content · Design
          </p>

          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Strategie, Content & Design –{" "}
            <span className="text-ink/70">persönlich, messbar, kreativ.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm text-muted">
            Kreatify ist eine Buchungs- & Marketingplattform mit klaren Paketen und
            flexiblen Einzelleistungen. Kein anonymer Checkout: Du bekommst immer
            persönliche Beratung und einen festen Ansprechpartner.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
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
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                Einstieg
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Wähle deine Zielgruppe – wir führen dich zur passenden Lösung.
              </h2>
              <p className="mt-2 text-sm text-muted">
                Der schnellste Weg zum Ergebnis: erst die Zielgruppe auswählen,
                dann Pakete vergleichen. Wenn nötig, kannst du Leistungen auch
                individuell kombinieren.
              </p>
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

      {/* FEINER DIVIDER (sparsam) */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-line" />
      </div>

      {/* BELIEBTE PAKETE (abgesetzt durch Panel-Hintergrund) */}
      <section className="bg-panel px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                Beliebte Pakete
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Bewährte Pakete – schnell startklar.
              </h2>
              <p className="mt-2 text-sm text-muted">
                Diese Pakete werden besonders häufig gebucht. Du bekommst einen
                klaren Umfang, planbare Schritte und persönliche Abstimmung.
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

      {/* WARUM */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              Warum Kreatify
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Klarheit, Vertrauen und ein fester Ansprechpartner.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Du sollst schnell verstehen, was du bekommst – und wie es weitergeht.
              Deshalb setzen wir auf klare Pakete, faire Optionen und persönliche
              Beratung anstatt anonymer Buchung.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Persönlich statt anonym",
                d: "Kein Checkout ohne Kontakt: Wir klären kurz Ziel, Umfang und Timing – danach geht’s strukturiert weiter.",
              },
              {
                t: "Klarer Umfang & Transparenz",
                d: "Pakete geben dir Orientierung. Du weißt, welche Leistungen enthalten sind und wie der Ablauf aussieht.",
              },
              {
                t: "Flexibel durch Einzelleistungen",
                d: "Wenn du etwas Spezifisches brauchst, kombinieren wir Leistungen zu einem Paket, das wirklich passt.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-line bg-paper p-5 shadow-soft"
              >
                <p className="text-sm font-semibold text-ink">{x.t}</p>
                <p className="mt-2 text-sm text-muted">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABLAUF */}
      <section className="bg-panel px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              Ablauf
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              In drei Schritten zur Umsetzung.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Du wählst ein Paket oder stellst Leistungen zusammen. Danach melden wir
              uns persönlich und stimmen alles ab.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Zielgruppe & Paket wählen",
                d: "Starte über Privat, Unternehmen, Kampfsport oder Print und wähle ein bewährtes Paket – oder kombiniere Leistungen.",
              },
              {
                n: "02",
                t: "Kurze Anfrage senden",
                d: "Teile Ziel, Zeitraum und Budgetrahmen mit. Das dauert in der Regel weniger als eine Minute.",
              },
              {
                n: "03",
                t: "Persönlich abstimmen",
                d: "Wir melden uns, klären Details und legen die nächsten Schritte fest. Du hast einen festen Ansprechpartner.",
              },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-line bg-paper p-5">
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
      <section id="beratung" className="bg-panel px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-line bg-paper p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">
                Unsicher, welches Paket passt?
              </p>
              <p className="mt-1 text-sm text-muted">
                Schreib uns kurz bei WhatsApp oder sende eine Anfrage – wir beraten dich
                persönlich und schlagen die passende Lösung vor.
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
                onClick={() => navigate("/anfrage")}
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
