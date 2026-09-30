import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { workCopy } from "../../data/ui";
import { projects, type Project } from "../../data/projects";
import {
  cardSpring,
  fadeReveal,
  projectArrowHover,
  projectCardHover,
  projectImageHover,
  reveal,
  viewport,
} from "../../lib/motion";
import { ProjectModal } from "../ui/ProjectModal";

export function SelectedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [focusedProjectId, setFocusedProjectId] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="work" className="section-shell scroll-mt-24 py-20 md:py-28" aria-labelledby="work-heading">
      <motion.div
        className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8 md:mb-16"
        variants={reducedMotion ? fadeReveal : reveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <div>
          <p className="eyebrow mb-4">{workCopy.eyebrow}</p>
          <h2 id="work-heading" className="section-heading">{workCopy.title}<span className="text-accent">.</span></h2>
        </div>
        <p className="max-w-[15rem] text-sm leading-relaxed text-muted">{workCopy.intro}</p>
      </motion.div>

      <LayoutGroup id="selected-work">
        <div>
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="border-b border-line py-9 first:pt-0 last:border-b-0 last:pb-0 md:py-12"
              variants={reducedMotion ? fadeReveal : reveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <motion.div
                className="group relative grid w-full grid-cols-1 items-center gap-6 text-left md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-x-10 md:gap-y-5 lg:grid-cols-[3rem_minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-8"
                layoutId={reducedMotion ? undefined : `project-card-${project.slug}`}
                variants={reducedMotion ? undefined : projectCardHover}
                initial="rest"
                animate={focusedProjectId === project.id ? "hover" : "rest"}
                whileHover="hover"
                transition={cardSpring}
              >
                <div className="flex items-center gap-4 md:col-span-2 lg:col-span-1 lg:self-start" aria-hidden="true">
                  <span className="text-sm font-medium tabular-nums tracking-[-0.04em] text-accent lg:text-xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-10 bg-line lg:hidden" />
                </div>
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden border border-line bg-surface"
                  layoutId={reducedMotion ? undefined : `project-media-${project.slug}`}
                >
                  <motion.div className="absolute -inset-2" variants={reducedMotion ? undefined : projectImageHover}>
                    <img
                      src={project.image}
                      srcSet={project.imageSrcSet}
                      sizes="(min-width: 1280px) 600px, (min-width: 768px) 52vw, calc(100vw - 40px)"
                      alt={project.imageAlt}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </motion.div>
                  <motion.span
                    aria-hidden="true"
                    className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center bg-accent text-accent-ink md:bottom-5 md:right-5"
                    variants={reducedMotion ? undefined : projectArrowHover}
                    style={reducedMotion ? { opacity: 1 } : undefined}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </motion.span>
                </motion.div>

                <div className="min-w-0 py-1 md:py-3">
                  <motion.h3
                    className="mb-5 font-display text-4xl leading-none tracking-[-0.025em] text-ink sm:text-5xl lg:text-6xl"
                    layoutId={reducedMotion ? undefined : `project-title-${project.slug}`}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted lg:text-base">{project.description}</p>
                  <dl className="mb-5">
                    <dt className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{workCopy.role}</dt>
                    <dd className="text-sm text-ink">{project.role}</dd>
                  </dl>
                  <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                    {project.tech.map((technology) => <span className="tag" key={technology}>{technology}</span>)}
                  </div>
                  <span className="mt-7 inline-flex min-h-11 items-center gap-5 border-b border-ink text-sm font-medium text-ink">
                    {workCopy.cta} <span aria-hidden="true">↗</span>
                  </span>
                </div>
                <button
                  type="button"
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  onClick={() => setSelectedProject(project)}
                  onFocus={() => setFocusedProjectId(project.id)}
                  onBlur={() => setFocusedProjectId(null)}
                  aria-label={`Read the ${project.title} case study`}
                  aria-haspopup="dialog"
                  aria-expanded={selectedProject?.id === project.id}
                  data-cursor="interactive"
                />
              </motion.div>
            </motion.article>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && <ProjectModal key={selectedProject.id} project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
}
