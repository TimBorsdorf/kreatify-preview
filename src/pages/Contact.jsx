import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
            Kontakt / Beratung
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Lass uns kurz sprechen.
          </h1>
          <p className="mt-4 text-sm text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-soft">
              <p className="text-sm font-semibold text-ink">WhatsApp</p>
              <p className="mt-2 text-sm text-muted">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-soft">
              <p className="text-sm font-semibold text-ink">Rückruf</p>
              <p className="mt-2 text-sm text-muted">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/anfrage")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-paper shadow-soft transition hover:opacity-90"
          >
            Zur Anfrage <span className="text-sm">↗</span>
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-soft">
          <img
            src="https://via.placeholder.com/1200x800.png?text=Contact"
            alt="Contact"
            className="h-72 w-full object-cover lg:h-full"
          />
        </div>
      </div>
    </section>
  );
}
