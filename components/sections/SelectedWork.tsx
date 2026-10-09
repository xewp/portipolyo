import { AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, BookOpen } from "lucide-react";
import { workCopy } from "../../data/ui";
import { projects, type Project } from "../../data/projects";
import { ProjectModal } from "../ui/ProjectModal";

export function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const touchStart = useRef<number | null>(null);

  const total = projects.length;

  const navigate = useCallback(
    (dir: number) => {
      setActiveIndex((i) => (i + dir + total) % total);
    },
    [total]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        navigate(-1);
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        navigate(1);
      }
    },
    [navigate]
  );

  const getDeckStyles = (idx: number) => {
    let diff = idx - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isActive = diff === 0;
    const isLeft = diff === -1;
    const isRight = diff === 1;
    const isFarLeft = diff === -2;
    const isFarRight = diff === 2;

    let translateX = "0%";
    let translateY = "0px";
    let rotate = "0deg";
    let scale = 1;
    let zIndex = 30;
    let opacity = 1;
    let filter = "brightness(1)";
    let pointerEvents: "auto" | "none" = "auto";
    let cursor = "default";

    if (isActive) {
      translateX = "0%";
      translateY = "0px";
      rotate = "0deg";
      scale = 1;
      zIndex = 30;
      opacity = 1;
      filter = "brightness(1)";
      pointerEvents = "auto";
      cursor = "default";
    } else if (isLeft) {
      translateX = "-42%";
      translateY = "18px";
      rotate = "-8.5deg";
      scale = 0.91;
      zIndex = 20;
      opacity = 0.85;
      filter = "brightness(0.55)";
      cursor = "pointer";
    } else if (isRight) {
      translateX = "42%";
      translateY = "18px";
      rotate = "8.5deg";
      scale = 0.91;
      zIndex = 20;
      opacity = 0.85;
      filter = "brightness(0.55)";
      cursor = "pointer";
    } else if (isFarLeft) {
      translateX = "-74%";
      translateY = "32px";
      rotate = "-14deg";
      scale = 0.82;
      zIndex = 10;
      opacity = 0.35;
      filter = "brightness(0.35)";
      cursor = "pointer";
    } else if (isFarRight) {
      translateX = "74%";
      translateY = "32px";
      rotate = "14deg";
      scale = 0.82;
      zIndex = 10;
      opacity = 0.35;
      filter = "brightness(0.35)";
      cursor = "pointer";
    } else {
      translateX = diff > 0 ? "85%" : "-85%";
      translateY = "40px";
      rotate = diff > 0 ? "18deg" : "-18deg";
      scale = 0.72;
      zIndex = 0;
      opacity = 0;
      filter = "brightness(0.2)";
      pointerEvents = "none";
    }

    return {
      translateX,
      translateY,
      rotate,
      scale,
      zIndex,
      opacity,
      filter,
      pointerEvents,
      cursor,
      isActive,
      diff,
    };
  };

  return (
    <section id="work" className="section-shell scroll-mt-24 py-16 md:py-24" aria-labelledby="work-heading">
      {/* ── Section Header ── */}
      <div className="mb-8 flex items-center justify-between border-b border-line pb-6">
        <div>
          <p className="eyebrow text-muted">{workCopy.eyebrow}</p>
          <h2 id="work-heading" className="section-heading text-3xl md:text-5xl font-display mt-1">
            {workCopy.title}<span className="text-accent">.</span>
          </h2>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setSelectedProject(projects[activeIndex])}
            className="group inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-muted hover:text-ink transition-colors"
          >
            <span>ALL PROJECTS</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* ── 3D Fanned Deck Stage ── */}
      <div
        className="relative w-full flex items-center justify-center py-6 md:py-10 outline-none select-none"
        style={{ perspective: 1200 }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStart.current !== null) {
            const dx = touchStart.current - e.changedTouches[0].clientX;
            if (Math.abs(dx) > 50) navigate(dx > 0 ? 1 : -1);
            touchStart.current = null;
          }
        }}
        role="region"
        aria-label="Interactive Projects Deck"
      >
        <div className="relative w-full max-w-[540px] h-[540px] md:h-[530px] flex items-center justify-center mx-auto">
          {projects.map((project, idx) => {
            const style = getDeckStyles(idx);
            const isCurrent = style.isActive;

            return (
              <div
                key={project.id}
                className="absolute top-0 w-full max-w-[520px] bg-[#0d1015] text-[#f4f4f6] border border-white/10 rounded-[24px] p-5 md:p-6 flex flex-col gap-3.5 shadow-2xl transition-all duration-500 will-change-transform"
                style={{
                  transformOrigin: "50% 85%",
                  transform: `translate3d(${style.translateX}, ${style.translateY}, 0) rotate(${style.rotate}) scale(${style.scale})`,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  filter: style.filter,
                  pointerEvents: style.pointerEvents,
                  cursor: style.cursor,
                  boxShadow: isCurrent
                    ? "0 28px 70px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.14)"
                    : "0 20px 50px -10px rgba(0, 0, 0, 0.7)",
                }}
                onClick={() => {
                  if (!isCurrent) {
                    setActiveIndex(idx);
                  }
                }}
                aria-hidden={!isCurrent}
              >
                {/* ── Top Badges ── */}
                <div className="flex items-center gap-2 flex-wrap">
                  {project.highlightBadge && (
                    <div className="inline-flex items-center gap-1.5 bg-white text-black font-mono text-[10.5px] font-extrabold tracking-wider px-3 py-1 rounded-full shadow-sm">
                      <span className="opacity-70 text-xs font-black">‹</span>
                      <span>{project.highlightBadge}</span>
                      <span className="opacity-70 text-xs font-black">›</span>
                    </div>
                  )}
                  {project.tags &&
                    project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center border border-white/15 bg-white/5 text-white/80 font-mono text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                {/* ── Crisp Full 16:9 Image Preview ── */}
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/12 bg-[#161a22] shadow-md group">
                  <img
                    src={project.image}
                    srcSet={project.imageSrcSet}
                    alt={project.imageAlt || project.title}
                    loading="eager"
                    draggable={false}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-2.5 right-2.5 font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-white/80 border border-white/15 backdrop-blur-sm">
                    {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>

                {/* ── Title Row ── */}
                <div className="flex items-baseline justify-between gap-2 mt-0.5">
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight truncate font-display">
                    {project.displayName || project.title}
                  </h3>
                  <span className="text-[11px] font-mono text-gray-400 shrink-0">
                    {project.role}
                  </span>
                </div>

                {/* ── Body: Short Description ── */}
                <p className="text-xs md:text-sm leading-relaxed text-gray-300/80 m-0 line-clamp-2">
                  {project.shortDesc || project.description}
                </p>

                {/* ── Tech Chips ── */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] text-white/65 border border-white/10 bg-white/5 px-2 py-0.5 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="font-mono text-[10px] text-white/40 px-1 py-0.5">
                      +{project.tech.length - 5}
                    </span>
                  )}
                </div>

                {/* ── Bottom Actions ── */}
                <div
                  className="flex items-center gap-2.5 mt-auto pt-1 flex-wrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs font-semibold px-4 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 text-white transition-all transform hover:-translate-y-0.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                      <span>Live Demo</span>
                      <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/50 cursor-not-allowed">
                      <span>Internal Project</span>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 font-mono text-xs font-semibold px-4 py-2 rounded-xl border border-white/15 bg-black/40 hover:bg-white/10 hover:border-white/30 text-white transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <BookOpen size={13} />
                    <span>Case Study</span>
                  </button>

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs font-semibold px-3 py-2 rounded-xl border border-white/15 bg-black/40 hover:bg-white/10 text-white transition-all transform hover:-translate-y-0.5"
                    >
                      <Github size={13} />
                    </a>
                  ) : (
                    <a
                      href="https://github.com/bautistakaizz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs font-semibold px-3 py-2 rounded-xl border border-white/15 bg-black/40 hover:bg-white/10 text-white transition-all transform hover:-translate-y-0.5"
                    >
                      <Github size={13} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Navigation Controls ── */}
      <div className="flex items-center justify-center gap-4 mt-2 mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Previous project"
          className="w-9 h-9 grid place-items-center rounded-full border border-line hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1.5">
          {projects.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`w-7 h-7 grid place-items-center rounded-full text-[10px] font-mono font-semibold transition-all cursor-pointer ${
                idx === activeIndex
                  ? "bg-ink text-paper border border-ink scale-110"
                  : "border border-line text-muted hover:border-muted"
              }`}
              aria-label={`View ${item.title}`}
            >
              {String(idx + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate(1)}
          aria-label="Next project"
          className="w-9 h-9 grid place-items-center rounded-full border border-line hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* ── Bottom Project Selectors ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
        {projects.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`flex items-center gap-2 p-3 text-left rounded-lg border text-xs transition-all cursor-pointer ${
              idx === activeIndex
                ? "bg-ink text-paper border-ink"
                : "border-line text-muted hover:border-ink hover:text-ink"
            }`}
          >
            <span className="font-mono text-[10px] opacity-60">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 truncate font-medium">{item.title}</span>
            <ArrowUpRight size={12} className="opacity-40" />
          </button>
        ))}
      </div>

      {/* ── Case Study Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
