import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../data/categories.js";
import { packages } from "../data/packages.js";
import { services } from "../data/services.js";

export default function Inquiry() {
  const [params] = useSearchParams();

  const packageId = params.get("package");
  const catSlug = params.get("cat");
  const servicesParam = params.get("services"); // "id1,id2,id3"

  const selectedPackage = useMemo(
    () => (packageId ? packages.find((p) => p.id === packageId) : null),
    [packageId]
  );

  const selectedCategory = useMemo(() => {
    const slug = selectedPackage?.category || catSlug || "";
    return slug ? categories.find((c) => c.slug === slug) : null;
  }, [selectedPackage, catSlug]);

  const selectedServiceIds = useMemo(() => {
    if (!servicesParam) return [];
    return servicesParam.split(",").map((s) => s.trim()).filter(Boolean);
  }, [servicesParam]);

  const selectedServices = useMemo(() => {
    if (selectedServiceIds.length === 0) return [];
    const set = new Set(selectedServiceIds);
    return services.filter((s) => set.has(s.id));
  }, [selectedServiceIds]);

  const [form, setForm] = useState({
    goal: "",
    timeframe: "",
    budget: "",
    name: "",
    contact: "",
  });

  const [sent, setSent] = useState(false);

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function onSubmit(e) {
    e.preventDefault();

    // später: API / Email / CRM
    // payload beispiel:
    // {
    //   packageId,
    //   cat: selectedCategory?.slug,
    //   services: selectedServiceIds,
    //   ...form
    // }

    setSent(true);
  }

  const waPhone = "491234567890";
  const waText = encodeURIComponent("Hi! Ich möchte ein Projekt anfragen.");
  const waHref = `https://wa.me/${waPhone}?text=${waText}`;

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        {/* LEFT: Zusammenfassung + Kontakt */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
            Anfrage / Beratung
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Kein Checkout – wir melden uns persönlich.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted">
            Lorem ipsum dolor sit amet. Du bekommst einen festen Ansprechpartner.
          </p>

          <div className="mt-6 space-y-2">
            {selectedCategory && <Pill label="Zielgruppe" value={selectedCategory.title} />}
            {selectedPackage && <Pill label="Beliebtes Paket" value={selectedPackage.title} />}
            {selectedServices.length > 0 && (
              <Pill label="Ausgewählte Leistungen" value={`${selectedServices.length} Leistungen`} />
            )}
          </div>

          {selectedServices.length > 0 && (
            <div className="mt-6 rounded-2xl border border-line bg-paper p-5 shadow-soft">
              <p className="text-sm font-semibold text-ink">Deine Auswahl</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {selectedServices.map((s) => (
                  <li key={s.id} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{s.title}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">
                Hinweis: Preis/Umfang stimmen wir persönlich ab.
              </p>
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-line bg-panel p-5">
            <p className="text-sm font-semibold text-ink">Direkter Kontakt</p>
            <p className="mt-2 text-sm text-muted">
              WhatsApp oder Rückruf – wie es dir lieber ist.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={waHref}
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
            </div>
          </div>
        </div>

        {/* RIGHT: Formular */}
        <div className="rounded-2xl border border-line bg-paper p-6 shadow-soft">
          {!sent ? (
            <form onSubmit={onSubmit} className="space-y-4">
              <Field label="Ziel des Projekts">
                <textarea
                  name="goal"
                  value={form.goal}
                  onChange={onChange}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="Lorem ipsum..."
                  required
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Zeitraum">
                  <input
                    name="timeframe"
                    value={form.timeframe}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="z.B. Januar / ASAP"
                    required
                  />
                </Field>

                <Field label="Budgetrahmen">
                  <input
                    name="budget"
                    value={form.budget}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="z.B. 500–1500€"
                    required
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="Name oder Firma"
                    required
                  />
                </Field>

                <Field label="Kontakt">
                  <input
                    name="contact"
                    value={form.contact}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="mail@example.com / +49 ..."
                    required
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-paper shadow-soft transition hover:opacity-90"
              >
                Anfrage senden <span className="text-sm">↗</span>
              </button>

              <p className="text-xs text-muted">
                Kein Checkout. Wir melden uns persönlich.
              </p>
            </form>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-ink">
                Danke! Wir melden uns persönlich bei dir.
              </p>
              <p className="text-sm text-muted">
                Lorem ipsum dolor sit amet. Wenn es schnell gehen soll: WhatsApp.
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-panel"
              >
                WhatsApp <span className="text-sm">↗</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

function Pill({ label, value }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-ink">
      <span className="text-muted">{label}:</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}
