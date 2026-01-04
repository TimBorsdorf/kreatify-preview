import { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { categories } from "../data/categories.js";
import { packages } from "../data/packages.js";
import { services } from "../data/services.js";
import PackageCard from "../components/PackageCard.jsx";

export default function Category() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const cat = categories.find((c) => c.slug === slug);

  const pkgs = useMemo(() => packages.filter((p) => p.category === slug), [slug]);
  const popular = useMemo(() => pkgs.filter((p) => p.popular), [pkgs]);
  const svc = useMemo(() => services.filter((s) => s.category === slug), [slug]);

  // Konfigurator (übersichtlicher: mit Suchfeld + Sticky Summary)
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return svc;
    return svc.filter((s) => s.title.toLowerCase().includes(q));
  }, [svc, query]);

  function toggleService(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function clearSelection() {
    setSelected([]);
  }

  function goToInquiryWithSelection() {
    const ids = selected.join(",");
    navigate(`/anfrage?cat=${slug}&services=${encodeURIComponent(ids)}`);
  }

  function goToInquiryWithPackage(packageId) {
    navigate(`/anfrage?package=${packageId}`);
  }

  if (!cat) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-muted">Zielgruppe nicht gefunden.</p>
          <Link
            to="/zielgruppen"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-panel"
          >
            Zur Zielgruppen-Übersicht <span className="text-sm">↗</span>
          </Link>
        </div>
      </section>
    );
  }

  const shownPkgs = popular.length ? popular : pkgs;

  return (
    <div>
      {/* HERO (noch ruhiger, klarere Hierarchie) */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              {cat.title}
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Lorem ipsum dolor sit amet.
            </h1>

            <p className="mt-4 max-w-xl text-sm text-muted">
              {cat.subtitle}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/anfrage?cat=" + slug)}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-paper shadow-soft transition hover:opacity-90"
              >
                Unverbindlich anfragen
              </button>
            </div>

          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-panel">
            <img
              src={cat.image}
              alt={cat.title}
              className="h-64 w-full object-cover lg:h-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* SECTION WRAPPER: konsistenter Aufbau */}
      <div className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* 1) Pakete */}
          <section>
            <HeaderBlock
              kicker="BELIEBTE PAKETE"
              title="Wähle ein Paket – klarer Umfang, klare Schritte."
              subtitle="Lorem ipsum dolor sit amet. Beliebte Pakete geben dir einen schnellen Start."
              right={
                <button
                  onClick={() => navigate("/pakete?cat=" + slug)}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-panel"
                >
                  Alle Pakete <span className="text-sm">↗</span>
                </button>
              }
            />

            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {shownPkgs.map((p) => (
                <div key={p.id} className="flex flex-col">
                  <PackageCard pkg={p} />

                </div>
              ))}
            </div>
          </section>

          {/* 2) Konfigurator: 2-Spalten Layout (links Auswahl, rechts Summary sticky) */}
          <section>
            <HeaderBlock
              kicker="Paket zusammenstellen"
              title="Wähle Leistungen – wir bauen daraus dein Paket."
              subtitle="Lorem ipsum dolor sit amet. Kein Checkout – wir melden uns persönlich und machen ein passendes Angebot."
            />

            <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_0.42fr]">
              {/* LEFT: Auswahl */}
              <div className="rounded-2xl border border-line bg-paper p-5 shadow-soft sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink">Leistungen auswählen</p>
                    <p className="mt-1 text-sm text-muted">
                      Tipp: erst auswählen, dann anfragen.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Suchen…"
                      className="w-full sm:w-56 rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                    {selected.length > 0 && (
                      <button
                        type="button"
                        onClick={clearSelection}
                        className="whitespace-nowrap rounded-full border border-line bg-paper px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-panel"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {filteredServices.map((s) => {
                    const active = selectedSet.has(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleService(s.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          active
                            ? "border-ink bg-panel"
                            : "border-line bg-paper hover:bg-panel"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-ink">{s.title}</p>
                            <p className="mt-1 text-sm text-muted">{s.description}</p>
                          </div>
                          <span
                            className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                              active
                                ? "border-ink bg-ink text-paper"
                                : "border-line bg-paper text-ink"
                            }`}
                          >
                            {active ? "✓" : "+"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {filteredServices.length === 0 && (
                  <p className="mt-4 text-sm text-muted">Keine Treffer.</p>
                )}
              </div>

              {/* RIGHT: Summary (sticky) */}
              <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-line bg-panel p-5 sm:p-6">
                <p className="text-sm font-semibold text-ink">Dein Paket</p>
                <p className="mt-2 text-sm text-muted">
                  Ausgewählt: <span className="font-semibold text-ink">{selected.length}</span>
                </p>

                <div className="mt-4 space-y-2">
                  {selected.length === 0 ? (
                    <p className="text-sm text-muted">
                      Wähle links Leistungen aus. Danach kannst du die Anfrage senden.
                    </p>
                  ) : (
                    <ul className="space-y-2 text-sm text-muted">
                      {selectedServicesFromAll(svc, selected).map((s) => (
                        <li key={s.id} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                          <span>{s.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="button"
                  disabled={selected.length === 0}
                  onClick={goToInquiryWithSelection}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] shadow-soft transition ${
                    selected.length === 0
                      ? "cursor-not-allowed bg-ink/20 text-ink/40"
                      : "bg-ink text-paper hover:opacity-90"
                  }`}
                >
                  Mit Auswahl anfragen <span className="text-sm">↗</span>
                </button>

                <p className="mt-3 text-xs text-muted">
                  Kein Checkout. Wir melden uns persönlich.
                </p>
              </aside>
            </div>
          </section>

          {/* 3) Kontakt/CTA – sehr klar, wenig Inhalt */}
          <section>
            <div className="rounded-2xl border border-line bg-paper p-6 shadow-soft sm:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Jedes Projekt ist individuell – wir beraten dich persönlich.
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

                  <a
                    href="tel:+491234567890"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-panel"
                  >
                    Anrufen
                  </a>

                  <button
                    onClick={() => navigate("/anfrage?cat=" + slug)}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-paper shadow-soft transition hover:opacity-90"
                  >
                    Projekt starten <span className="text-sm">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/** Kleine Helper-Komponenten: konsistente Überschriften ohne „Rummel“ */
function HeaderBlock({ kicker, title, subtitle, right }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
          {kicker}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {subtitle ? <p className="mt-2 text-sm text-muted">{subtitle}</p> : null}
      </div>
      {right ? <div className="hidden md:block">{right}</div> : null}
    </div>
  );
}

/** Für die Summary: ausgewählte Services in der Reihenfolge der Auswahl */
function selectedServicesFromAll(allServices, selectedIds) {
  const map = new Map(allServices.map((s) => [s.id, s]));
  return selectedIds.map((id) => map.get(id)).filter(Boolean);
}
