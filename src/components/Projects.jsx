import { useRef, useState, useCallback, useEffect } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, ExternalLink, BookOpen, Layers } from "lucide-react";
import { projectsData } from "../utils/mockData";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef(null);
  const containerRef = useRef(null);

  const total = projectsData.length;

  const navigate = useCallback((dir) => {
    setActiveIndex((i) => (i + dir + total) % total);
  }, [total]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      navigate(-1);
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      navigate(1);
    }
  }, [navigate]);

  // Calculate deck position metrics for each card relative to active index
  const getDeckStyles = (idx) => {
    let diff = idx - activeIndex;
    // wrap around for cyclical deck
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
    let pointerEvents = "auto";
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
      opacity = 0.82;
      filter = "brightness(0.55)";
      cursor = "pointer";
    } else if (isRight) {
      translateX = "42%";
      translateY = "18px";
      rotate = "8.5deg";
      scale = 0.91;
      zIndex = 20;
      opacity = 0.82;
      filter = "brightness(0.55)";
      cursor = "pointer";
    } else if (isFarLeft) {
      translateX = "-74%";
      translateY = "32px";
      rotate = "-15deg";
      scale = 0.82;
      zIndex = 10;
      opacity = 0.35;
      filter = "brightness(0.35)";
      cursor = "pointer";
    } else if (isFarRight) {
      translateX = "74%";
      translateY = "32px";
      rotate = "15deg";
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
      diff
    };
  };

  return (
    <section id="projects" className="projects-section">
      <div className="section-shell">
        {/* ── Section Header ───────────────────────────────── */}
        <div className="deck-header">
          <div className="deck-header__left">
            <span className="section-label">02 — projects</span>
          </div>
          <div className="deck-header__right">
            <span className="deck-header__all-link">
              <span>ALL PROJECTS</span>
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>

        {/* ── 3D Fanned Deck Stage ─────────────────────────── */}
        <div
          ref={containerRef}
          className="deck-stage"
          role="region"
          aria-label="Interactive Projects Deck"
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
        >
          <div className="deck-container">
            {projectsData.map((project, idx) => {
              const style = getDeckStyles(idx);
              const isCurrent = style.isActive;

              return (
                <div
                  key={project.id}
                  className={`deck-card ${isCurrent ? "deck-card--active" : "deck-card--inactive"}`}
                  style={{
                    transform: `translate3d(${style.translateX}, ${style.translateY}, 0) rotate(${style.rotate}) scale(${style.scale})`,
                    zIndex: style.zIndex,
                    opacity: style.opacity,
                    filter: style.filter,
                    pointerEvents: style.pointerEvents,
                    cursor: style.cursor
                  }}
                  onClick={() => {
                    if (!isCurrent) {
                      setActiveIndex(idx);
                    }
                  }}
                  aria-hidden={!isCurrent}
                >
                  {/* ── Card Top Badges ── */}
                  <div className="deck-card__badges">
                    {project.highlightBadge && (
                      <div className="badge-highlight">
                        <span className="badge-highlight__bracket">‹</span>
                        <span className="badge-highlight__text">{project.highlightBadge}</span>
                        <span className="badge-highlight__bracket">›</span>
                      </div>
                    )}
                    {project.tags && project.tags.map((tag) => (
                      <span key={tag} className="badge-outline">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* ── Crisp Full 16:9 Image Preview ── */}
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/12 bg-[#161a22] shadow-md group">
                    <img
                      src={project.image}
                      alt={project.title}
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
                    <h3 className="deck-card__title">
                      {project.displayName || project.title}
                    </h3>
                  </div>

                  {/* ── Body: Description ── */}
                  <p className="deck-card__desc">
                    {project.shortDesc || project.description}
                  </p>

                  {/* ── Tech Tags ── */}
                  <div className="deck-card__tech">
                    {project.tech.slice(0, 5).map((t) => (
                      <span key={t} className="tech-chip">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="tech-chip tech-chip--more">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>

                  {/* ── Bottom Actions (Sleek Dark Pill Buttons) ── */}
                  <div className="deck-card__actions" onClick={(e) => e.stopPropagation()}>
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="deck-action-btn deck-action-btn--primary"
                      >
                        <span className="status-dot-pulse" />
                        <span>Live Demo</span>
                        <ArrowUpRight size={15} />
                      </a>
                    ) : (
                      <span className="deck-action-btn deck-action-btn--disabled">
                        <span>Internal Project</span>
                      </span>
                    )}

                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="deck-action-btn"
                      >
                        <Github size={15} />
                        <span>Source Code</span>
                      </a>
                    ) : (
                      <a
                        href={`https://github.com/bautistakaizz`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="deck-action-btn"
                      >
                        <Github size={15} />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Deck Controls (Prev / Dots / Next) ───────────── */}
        <div className="deck-controls">
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous project"
            className="deck-nav-btn"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="deck-dots">
            {projectsData.map((item, idx) => (
              <button
                key={item.id}
                className={`deck-dot ${idx === activeIndex ? "deck-dot--active" : ""}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View ${item.title}`}
                aria-pressed={idx === activeIndex}
              >
                <span className="deck-dot__num">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate(1)}
            aria-label="Next project"
            className="deck-nav-btn"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* ── Bottom Project Selectors ─────────────────────── */}
        <div className="deck-tabs">
          {projectsData.map((item, idx) => (
            <button
              key={item.id}
              className={`deck-tab ${idx === activeIndex ? "deck-tab--active" : ""}`}
              onClick={() => setActiveIndex(idx)}
            >
              <span className="deck-tab__num">{String(idx + 1).padStart(2, "0")}</span>
              <span className="deck-tab__name">{item.title}</span>
              <ArrowUpRight size={13} className="deck-tab__arrow" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
