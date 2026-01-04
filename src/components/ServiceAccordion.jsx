import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ServiceAccordion({ services }) {
  const [openId, setOpenId] = useState(services[0]?.id ?? null);
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {services.map((s) => {
        const open = s.id === openId;
        return (
          <div
            key={s.id}
            className="overflow-hidden rounded-2xl border border-line bg-paper shadow-soft"
          >
            <button
              type="button"
              onClick={() => setOpenId(open ? null : s.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-ink">{s.title}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-panel text-xs text-ink">
                {open ? "−" : "+"}
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-200 ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden px-5 pb-5">
                <p className="text-sm text-muted">{s.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate(`/anfrage?service=${s.id}`)}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-panel"
                  >
                    In Paket integrieren / anfragen
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
