// src/pages/Category.jsx
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
  const popularPkgs = useMemo(() => pkgs.filter((p) => p.popular), [pkgs]);
  const otherPkgs = useMemo(() => pkgs.filter((p) => !p.popular), [pkgs]);

  const svc = useMemo(() => services.filter((s) => s.category === slug), [slug]);

  // Paket (Basis) + Zusatzleistungen (Multi)
  const [selectedPackage, setSelectedPackage] = useState(null); // packageId
  const [selectedServices, setSelectedServices] = useState([]); // serviceIds
  const selectedServicesSet = useMemo(
    () => new Set(selectedServices),
    [selectedServices]
  );

  // Service-Suche
  const [query, setQuery] = useState("");

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return svc;
    return svc.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q)
    );
  }, [svc, query]);

  function selectPackage(packageId) {
    setSelectedPackage(packageId);
  }

  function clearPackage() {
    setSelectedPackage(null);
  }

  function toggleService(serviceId) {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((x) => x !== serviceId)
        : [...prev, serviceId]
    );
  }

  function clearServices() {
    setSelectedServices([]);
  }

  function goToInquiry() {
    // Wichtig: Paket + Services in EINER Anfrage zusammenführen
    const servicesParam = selectedServices.join(",");
    const pkg = selectedPackage ?? "";
    navigate(
      `/anfrage?cat=${slug}&package=${encodeURIComponent(
        pkg
      )}&services=${encodeURIComponent(servicesParam)}`
    );
  }

  const selectedPackageObj = useMemo(() => {
    if (!selectedPackage) return null;
    return packages.find((p) => p.id === selectedPackage) || null;
  }, [selectedPackage]);

  if (!cat) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-muted">Bereich nicht gefunden.</p>
          <Link
            to="/zielgruppen"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-panel"
          >
            Zur Übersicht <span className="text-sm">↗</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div>
      {/* HERO */}
      <section className="px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              {cat.title}
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Pakete auswählen und bei Bedarf erweitern
            </h1>

            <p className="mt-4 max-w-xl text-sm text-muted">
              Du startest mit einem Paket als Basis und kannst es mit einzelnen
              Leistungen ergänzen. Es gibt keinen direkten Checkout – nach deiner
              Auswahl melden wir uns persönlich, klären Details und machen dir ein
              konkretes Angebot.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/pakete?cat=" + slug)}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-panel"
              >
                Alle Pakete ansehen <span className="text-sm">↗</span>
              </button>

              <button
                onClick={() => navigate("/anfrage?cat=" + slug)}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-paper shadow-soft transition hover:opacity-90"
              >
                Direkt anfragen <span className="text-sm">↗</span>
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

      {/* CONTENT */}
      <div className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-14">
          {/* 1) Pakete */}
          <section>
            <HeaderBlock
              kicker="Schritt 1"
              title="Basis-Paket wählen"
              subtitle="Wähle ein Paket als Grundlage. Danach kannst du zusätzliche Leistungen hinzufügen."
            />

            {/* Beliebte Pakete */}
            {popularPkgs.length > 0 && (
              <div className="mt-7">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                      Beliebte Pakete
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      Häufig gebucht – ideal, wenn du schnell starten möchtest.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  {popularPkgs.map((p) => {
                    const active = selectedPackage === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => selectPackage(p.id)}
                        className={`rounded-2xl border text-left transition ${
                          active
                            ? "border-ink bg-panel"
                            : "border-line bg-paper hover:bg-panel"
                        }`}
                      >
                        <PackageCard pkg={p} />
                        <div className="px-4 pb-4">
                          <p className="mt-2 text-xs text-muted">
                            {active
                              ? "Als Basis ausgewählt – du kannst Leistungen ergänzen"
                              : "Als Basis auswählen"}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Weitere Pakete */}
            {otherPkgs.length > 0 && (
              <div className="mt-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                  Weitere Pakete
                </p>
                <p className="mt-2 text-sm text-muted">
                  Alternative Optionen – ebenfalls passend für diesen Bereich.
                </p>

                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  {otherPkgs.map((p) => {
                    const active = selectedPackage === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => selectPackage(p.id)}
                        className={`rounded-2xl border text-left transition ${
                          active
                            ? "border-ink bg-panel"
                            : "border-line bg-paper hover:bg-panel"
                        }`}
                      >
                        <PackageCard pkg={p} />
                        <div className="px-4 pb-4">
                          <p className="mt-2 text-xs text-muted">
                            {active
                              ? "Als Basis ausgewählt – du kannst Leistungen ergänzen"
                              : "Als Basis auswählen"}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {pkgs.length === 0 && (
              <div className="mt-7 rounded-2xl border border-line bg-paper p-6">
                <p className="text-sm font-semibold text-ink">
                  Aktuell sind in diesem Bereich noch keine Pakete hinterlegt.
                </p>
                <p className="mt-2 text-sm text-muted">
                  Du kannst trotzdem Leistungen auswählen und eine Anfrage senden –
                  wir melden uns persönlich.
                </p>
              </div>
            )}
          </section>

          {/* 2) Leistungen hinzufügen */}
          <section>
            <HeaderBlock
              kicker="Schritt 2"
              title="Leistungen ergänzen"
              subtitle="Wenn du zusätzliche Bausteine brauchst, wähle sie hier aus. Du kannst mehrere Leistungen kombinieren."
            />

            <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_0.42fr]">
              {/* LEFT: Auswahl */}
              <div className="rounded-2xl border border-line bg-paper p-5 shadow-soft sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Verfügbare Leistungen
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Tipp: Suche nach Stichworten und wähle die passenden Bausteine.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Suchen…"
                      className="w-full sm:w-56 rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                    {selectedServices.length > 0 && (
                      <button
                        type="button"
                        onClick={clearServices}
                        className="whitespace-nowrap rounded-full border border-line bg-paper px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-panel"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {filteredServices.map((s) => {
                    const active = selectedServicesSet.has(s.id);
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
                            <p className="text-sm font-semibold text-ink">
                              {s.title}
                            </p>
                            <p className="mt-1 text-sm text-muted">
                              {s.description}
                            </p>
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

              {/* RIGHT: Summary */}
              <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-line bg-panel p-5 sm:p-6">
                <p className="text-sm font-semibold text-ink">Deine Auswahl</p>

                {/* Basis-Paket */}
                <div className="mt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                    Basis-Paket
                  </p>

                  {selectedPackageObj ? (
                    <div className="mt-2 rounded-2xl border border-line bg-paper p-4">
                      <p className="text-sm font-semibold text-ink">
                        {selectedPackageObj.title}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {selectedPackageObj.short ||
                          "Ausgewählt als Grundlage. Du kannst Leistungen ergänzen."}
                      </p>

                      <button
                        type="button"
                        onClick={clearPackage}
                        className="mt-3 inline-flex rounded-full border border-line bg-paper px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-panel"
                      >
                        Paket entfernen
                      </button>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-muted">
                      Optional: Wähle oben ein Paket als Basis.
                    </p>
                  )}
                </div>

                {/* Zusatzleistungen */}
                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                    Zusatzleistungen
                  </p>

                  <p className="mt-2 text-sm text-muted">
                    Ausgewählt:{" "}
                    <span className="font-semibold text-ink">
                      {selectedServices.length}
                    </span>
                  </p>

                  {selectedServices.length > 0 ? (
                    <ul className="mt-3 space-y-2 text-sm text-muted">
                      {selectedServicesFromAll(svc, selectedServices).map((s) => (
                        <li key={s.id} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                          <span>{s.title}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-muted">
                      Optional: Ergänze dein Paket mit einzelnen Bausteinen.
                    </p>
                  )}
                </div>

                {/* Anfrage */}
                <button
                  type="button"
                  onClick={goToInquiry}
                  disabled={!selectedPackageObj && selectedServices.length === 0}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] shadow-soft transition ${
                    !selectedPackageObj && selectedServices.length === 0
                      ? "cursor-not-allowed bg-ink/20 text-ink/40"
                      : "bg-ink text-paper hover:opacity-90"
                  }`}
                >
                  Auswahl anfragen <span className="text-sm">↗</span>
                </button>

                <p className="mt-3 text-xs text-muted">
                  Kein Checkout. Wir melden uns persönlich und klären alles Weitere.
                </p>
              </aside>
            </div>
          </section>

          {/* 3) Kontakt */}
          <section>
            <div className="rounded-2xl border border-line bg-paper p-6 shadow-soft sm:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Lieber direkt sprechen?
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Wenn du unsicher bist, reichen zwei Sätze per WhatsApp – wir
                    melden uns zeitnah mit einem Vorschlag.
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
                    Anfrage senden <span className="text-sm">↗</span>
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

/* ---------- UI helpers ---------- */

function HeaderBlock({ kicker, title, subtitle }) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
        {kicker}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-2 text-sm text-muted">{subtitle}</p> : null}
    </div>
  );
}

/** Für die Summary: ausgewählte Services in der Reihenfolge der Auswahl */
function selectedServicesFromAll(allServices, selectedIds) {
  const map = new Map(allServices.map((s) => [s.id, s]));
  return selectedIds.map((id) => map.get(id)).filter(Boolean);
}
