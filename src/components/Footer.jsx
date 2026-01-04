export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Kreatify. Lorem ipsum dolor sit amet.</p>
        <div className="flex flex-wrap gap-3">
          <span>Impressum (Platzhalter)</span>
          <span className="text-line">·</span>
          <span>Datenschutz (Platzhalter)</span>
        </div>
      </div>
    </footer>
  );
}
