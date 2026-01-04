
// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Fix: Beim Seitenwechsel immer ganz nach oben scrollen.
 * - scrollTo(0,0) sorgt dafür, dass es nicht “mittig” bleibt.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Bei Hash-Links (z.B. #beratung) optional nicht erzwingen.
    // Wenn du immer nach oben willst, entferne die if-Abfrage.
    if (hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash]);

  return null;
}
