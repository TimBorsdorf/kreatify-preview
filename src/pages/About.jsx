export default function About() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
            Über Kreatify
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Persönlich statt anonym.
          </h1>
          <p className="mt-4 text-sm text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-soft">
          <img
            src="https://via.placeholder.com/1200x800.png?text=About"
            alt="About"
            className="h-72 w-full object-cover lg:h-full"
          />
        </div>
      </div>
    </section>
  );
}
