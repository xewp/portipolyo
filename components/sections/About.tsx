import { motion, useReducedMotion } from "framer-motion";
import { sectionCopy, site } from "../../data/site";
import { fadeReveal, reveal, viewport } from "../../lib/motion";

export default function About() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? fadeReveal : reveal;
  const copy = sectionCopy.about;

  return (
    <section id="about" aria-labelledby="about-heading" className="section-shell border-t border-line">
      <div className="mb-12 flex items-center justify-between gap-4 md:mb-16">
        <p className="eyebrow">{copy.label}</p>
        <span className="eyebrow text-muted" aria-hidden="true">{copy.number}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.h2
            id="about-heading"
            className="section-heading whitespace-pre-line"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
          >
            {copy.title}
          </motion.h2>

          <div className="mt-8 inline-flex flex-wrap items-center gap-3 border-b border-line pb-3 text-sm">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-muted">{copy.locationLabel}</span>
            <span>{site.location}</span>
          </div>
        </div>

        <motion.div
          className="space-y-6 lg:col-span-7 lg:pt-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
        >
          {site.bio.map((paragraph, index) => (
            <p
              key={paragraph}
              className={index === 0 ? "text-lg leading-relaxed tracking-tight text-ink md:text-xl md:leading-relaxed" : "text-base leading-relaxed text-muted"}
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      <div className="mt-14 border-t border-line pt-7 md:mt-20 md:pt-9">
        <motion.h3
          className="eyebrow mb-7 md:mb-9"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
        >
          {copy.skillsLabel}
        </motion.h3>
        <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {site.skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={variants}
              className="border-t border-line pt-5"
            >
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h4 className="text-sm font-medium text-ink">{skillGroup.category}</h4>
                <span className="text-xs text-muted" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label={skillGroup.category}>
                {skillGroup.items.map((skill) => <li key={skill} className="tag">{skill}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
