import { motion, useReducedMotion } from "framer-motion";
import { experience } from "../../data/experience";
import { sectionCopy } from "../../data/site";
import { fadeReveal, reveal, viewport } from "../../lib/motion";

export default function Experience() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? fadeReveal : reveal;
  const copy = sectionCopy.experience;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-shell border-t border-line">
      <div className="mb-12 flex items-center justify-between gap-4 md:mb-16">
        <p className="eyebrow">{copy.label}</p>
        <span className="eyebrow text-muted" aria-hidden="true">{copy.number}</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <motion.h2
            id="experience-heading"
            className="section-heading whitespace-pre-line"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
          >
            {copy.title}
          </motion.h2>
          <p className="mt-7 max-w-sm text-base leading-relaxed text-muted">{copy.intro}</p>
        </div>

        <ol className="relative border-l border-line lg:col-span-8" aria-label={copy.timelineLabel}>
          {experience.map((entry, index) => (
            <motion.li
              key={entry.id}
              className="relative pb-10 pl-7 last:pb-0 sm:pl-10"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={variants}
            >
              <span className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full ${index === 0 ? "bg-accent" : "border border-ink bg-paper"}`} aria-hidden="true" />
              <div className="border-b border-line pb-10">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-xs uppercase tracking-[0.12em] text-muted">
                  <span>{entry.period}</span>
                  <span>{entry.location}</span>
                </div>
                <h3 className="text-xl font-medium tracking-tight text-ink sm:text-2xl">{entry.role}</h3>
                {entry.company && <p className="mt-1 text-sm text-muted">{entry.company}</p>}
                {entry.description && <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base sm:leading-relaxed">{entry.description}</p>}
                {entry.tags && entry.tags.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={entry.role}>
                    {entry.tags.map((tag) => <li key={tag} className="tag">{tag}</li>)}
                  </ul>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
