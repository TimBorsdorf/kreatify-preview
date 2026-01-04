export default function WhatsAppFloating() {
  const phone = "491234567890";
  const text = encodeURIComponent("Hi! Ich möchte ein Projekt anfragen.");
  const href = `https://wa.me/${phone}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink shadow-lift transition hover:bg-panel"
    >
      WhatsApp <span className="text-sm">↗</span>
    </a>
  );
}
