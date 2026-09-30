import { useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { sectionCopy, site } from "../../data/site";

export default function Footer() {
  const reducedMotion = useReducedMotion();

  function backToTop() {
    document.getElementById("main")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  }

  return (
    <footer className="border-t border-line">
      <div className="section-shell flex flex-col items-start justify-between gap-6 !py-8 sm:flex-row sm:items-center">
        <p className="text-xs leading-relaxed text-muted">
          © {new Date().getFullYear()} {site.name}. {sectionCopy.footer.copyright}
        </p>
        <button
          type="button"
          className="group inline-flex min-h-11 items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-ink"
          onClick={backToTop}
        >
          {sectionCopy.footer.backToTop}
          <span className="flex h-9 w-9 items-center justify-center border border-line">
            <ArrowUp size={16} className="transition-transform duration-200 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0" aria-hidden="true" />
          </span>
        </button>
      </div>
    </footer>
  );
}
