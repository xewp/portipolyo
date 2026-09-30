import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { workCopy } from "../../data/ui";
import type { Project } from "../../data/projects";
import { fadeReveal, modalBackdrop, modalFade, modalPanel, reveal, viewport } from "../../lib/motion";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const reducedMotion = useReducedMotion();
  onCloseRef.current = onClose;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // Inert removes the background from both keyboard navigation and the
    // accessibility tree. Save existing values so another overlay's state is
    // preserved when this one closes.
    closeRef.current?.focus({ preventScroll: true });
    const backgroundElements = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && !element.contains(dialog))
      .map((element) => ({ element, inert: element.inert }));
    backgroundElements.forEach(({ element }) => { element.inert = true; });
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    const focusFrame = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));

    const getFocusable = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []).filter((element) => element.getClientRects().length > 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const elements = getFocusable();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first || !last) {
        event.preventDefault();
        dialogRef.current?.focus();
      } else if (event.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    const keepFocusInDialog = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialogRef.current?.contains(event.target)) closeRef.current?.focus({ preventScroll: true });
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", keepFocusInDialog);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", keepFocusInDialog);
      backgroundElements.forEach(({ element, inert }) => { element.inert = inert; });
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/65 p-3 sm:p-6"
      variants={modalBackdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-study-title-${project.slug}`}
        aria-describedby={`case-study-overview-${project.slug}`}
        tabIndex={-1}
        className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl overflow-y-auto border border-line bg-paper text-ink shadow-2xl outline-none sm:max-h-[calc(100dvh-3rem)]"
        layoutId={reducedMotion ? undefined : `project-card-${project.slug}`}
        variants={reducedMotion ? modalFade : modalPanel}
        initial="hidden"
        animate="visible"
        exit="exit"
        layoutScroll
      >
        <div className="sticky top-0 z-20 flex items-center justify-between gap-6 border-b border-line bg-paper px-5 py-3 sm:px-8">
          <p className="eyebrow">{workCopy.caseStudy} / {String(project.id).padStart(2, "0")}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex min-h-11 items-center gap-3 px-2 text-sm text-ink"
            aria-label={`Close ${project.title} case study`}
            data-cursor="interactive"
          >
            {workCopy.close} <span aria-hidden="true" className="text-2xl leading-none">×</span>
          </button>
        </div>

        <div className="px-5 pb-8 pt-8 sm:px-8 sm:pb-12 sm:pt-10">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
            <motion.h2
              id={`case-study-title-${project.slug}`}
              className="font-display text-5xl leading-[0.95] tracking-[-0.035em] sm:text-7xl"
              layoutId={reducedMotion ? undefined : `project-title-${project.slug}`}
            >
              {project.title}
            </motion.h2>
            <dl className="flex gap-8 text-sm">
              <div><dt className="mb-1 text-xs text-muted">{workCopy.role}</dt><dd>{project.role}</dd></div>
            </dl>
          </div>

          <motion.div
            className="relative mb-8 aspect-[16/10] overflow-hidden border border-line bg-surface sm:aspect-video"
            layoutId={reducedMotion ? undefined : `project-media-${project.slug}`}
          >
            <img
              src={project.image}
              srcSet={project.imageSrcSet}
              sizes="(min-width: 1024px) 600px, (min-width: 640px) 56vw, 72vw"
              alt={project.imageAlt}
              width={1024}
              height={1024}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </motion.div>

          <div className="mb-9 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tech.map((technology) => <span className="tag" key={technology}>{technology}</span>)}
          </div>

          <div className="grid gap-8 sm:grid-cols-[1fr_2fr] sm:gap-x-10">
            {([
              [workCopy.chapters[0], project.caseStudy.overview],
              [workCopy.chapters[1], project.caseStudy.challenge],
              [workCopy.chapters[2], project.caseStudy.approach],
              [workCopy.chapters[3], project.caseStudy.outcome],
            ] as const).map(([heading, copy], index) => (
              <motion.section
                className="grid gap-3 border-t border-line pt-6 sm:col-span-2 sm:grid-cols-subgrid"
                key={heading}
                aria-labelledby={`case-study-${project.slug}-${heading.toLowerCase()}`}
                variants={reducedMotion ? fadeReveal : reveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                <h3 className="font-display text-3xl" id={`case-study-${project.slug}-${heading.toLowerCase()}`}>
                  <span className="mr-3 align-middle font-sans text-xs tabular-nums text-muted">0{index + 1}</span>{heading}
                </h3>
                <p id={index === 0 ? `case-study-overview-${project.slug}` : undefined} className="max-w-2xl text-base leading-relaxed text-muted">{copy}</p>
              </motion.section>
            ))}
          </div>

          {(project.live || project.github) && (
            <div className="mt-10 flex flex-wrap gap-4 border-t border-line pt-8">
              {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="button-primary" data-cursor="interactive">{workCopy.liveCta} <span aria-hidden="true">↗</span></a>}
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="button-secondary" data-cursor="interactive">{workCopy.sourceCta} <span aria-hidden="true">↗</span></a>}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
