import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const mainNav = [
  { to: "/", label: "Start" },
  { to: "/zielgruppen", label: "Zielgruppen" },
  { to: "/pakete", label: "Pakete" },
  { to: "/anfrage", label: "Anfrage" },
];

const secondaryNav = [{ to: "/ueber-uns", label: "Über" }];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Menü bei Navigation schließen
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll-Lock bei offenem Menü
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (to) => pathname === to;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper border-b border-line shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-ink shadow-soft">
            <span className="text-base font-extrabold text-paper tracking-tight">
              K
            </span>
          </div>
          <div className="leading-tight">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-ink">
              Kreatify
            </div>
            <div className="text-[9px] uppercase tracking-[0.28em] text-muted">
              Pakete · Leistungen · Beratung
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative transition-colors hover:text-ink ${
                isActive(item.to) ? "text-ink" : ""
              }`}
            >
              {item.label}
              {isActive(item.to) && (
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-ink" />
              )}
            </Link>
          ))}

          <div className="h-4 w-px bg-line" />

          {secondaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`transition-colors hover:text-ink ${
                isActive(item.to) ? "text-ink" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Link
            to="/anfrage"
            className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper shadow-soft transition hover:opacity-90 sm:inline-flex"
          >
            Projekt starten <span className="text-xs">↗</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-[0_4px_12px_rgba(0,0,0,0.12)] md:hidden"
          >
            <span className="relative flex h-3.5 w-4 flex-col justify-between">
              <span
                className={`h-[2px] rounded-full bg-ink transition-transform duration-200 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] rounded-full bg-ink transition-all duration-150 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-[2px] rounded-full bg-ink transition-transform duration-200 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/45 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-paper border-l border-line shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-line bg-panel px-5 py-4">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-ink">
              Menü
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-line bg-paper px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-panel"
            >
              Schließen
            </button>
          </div>

          {/* Panel Content */}
          <div className="px-5 py-4">
            <div className="space-y-2">
              {mainNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                    isActive(item.to)
                      ? "border-ink bg-panel text-ink"
                      : "border-line bg-paper text-ink hover:bg-panel"
                  }`}
                >
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-sm">↗</span>
                </Link>
              ))}
            </div>

            <div className="my-5 h-px bg-line" />

            <div className="space-y-2">
              {secondaryNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                    isActive(item.to)
                      ? "border-ink bg-panel text-ink"
                      : "border-line bg-paper text-ink hover:bg-panel"
                  }`}
                >
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-sm">↗</span>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Link
                to="/anfrage"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-paper shadow-soft transition hover:opacity-90"
              >
                Projekt starten <span className="text-sm">↗</span>
              </Link>

              <a
                href="https://wa.me/491234567890?text=Hi!%20Ich%20m%C3%B6chte%20ein%20Projekt%20anfragen."
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-paper px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-panel"
              >
                WhatsApp <span className="text-sm">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
