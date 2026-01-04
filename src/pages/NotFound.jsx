import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-semibold text-ink">404</h1>
        <p className="mt-3 text-sm text-muted">Seite nicht gefunden.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-panel"
        >
          Zur Startseite
        </Link>
      </div>
    </section>
  );
}
