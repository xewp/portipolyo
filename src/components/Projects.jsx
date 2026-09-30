import { useRef, useState, useCallback, useEffect } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github } from "lucide-react";
import { projectsData } from "../utils/mockData";

const VISIBLE_CARDS = 4; // how many cards are visible in the stack

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef(null);
  const [direction, setDirection] = useState(0); // -1 prev, 1 next, 0 initial

  const navigate = useCallback((dir) => {
    setDirection(dir);
    setActiveIndex((i) => (i + dir + projectsData.length) % projectsData.length);
  }, []);

  // keyboard navigation when section is focused
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); navigate(-1); }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); navigate(1); }
  }, [navigate]);

  // Preload adjacent images
  useEffect(() => {
    const preload = (idx) => {
      const img = new Image();
      img.src = projectsData[idx]?.image;
    };
    preload((activeIndex + 1) % projectsData.length);
    preload((activeIndex - 1 + projectsData.length) % projectsData.length);
  }, [activeIndex]);

  return (
    <section id="projects" className="projects-section">
      <div className="section-shell">
        {/* ── Header ───────────────────────────────────── */}
        <div className="projects-heading">
          <div>
            <p className="section-label">02 — projects</p>
            <h2 className="display-heading">projects</h2>
          </div>
          <p>A selection of recent work. Swipe or use arrows to browse.</p>
        </div>

        {/* ── Stacked Carousel ─────────────────────────── */}
        <div
          className="stack-carousel"
          role="region"
          aria-label="Project showcase"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStart.current !== null) {
              const dx = touchStart.current - e.changedTouches[0].clientX;
              if (Math.abs(dx) > 60) navigate(dx > 0 ? 1 : -1);
              touchStart.current = null;
            }
          }}
        >
          {/* The card stack */}
          <div className="stack-container">
            {projectsData.map((project, idx) => {
              // Calculate position relative to active card
              const offset = (idx - activeIndex + projectsData.length) % projectsData.length;
              const isVisible = offset < VISIBLE_CARDS;
              const isActive = offset === 0;

              return (
                <div
                  key={project.id}
                  className={`stack-card ${isActive ? "stack-card--active" : ""}`}
                  style={{
                    "--stack-offset": offset,
                    zIndex: projectsData.length - offset,
                    opacity: isVisible ? 1 - offset * 0.15 : 0,
                    transform: isVisible
                      ? `translateY(${offset * 28}px) scale(${1 - offset * 0.04})`
                      : `translateY(${VISIBLE_CARDS * 28}px) scale(${1 - VISIBLE_CARDS * 0.04})`,
                    pointerEvents: isActive ? "auto" : "none",
                    filter: isActive ? "none" : `brightness(${1 - offset * 0.06})`,
                  }}
                  aria-hidden={!isActive}
                  onClick={() => {
                    if (!isActive) {
                      setDirection(1);
                      setActiveIndex(idx);
                    }
                  }}
                >
                  {/* Card Content */}
                  <div className="stack-card__image">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading={offset < 2 ? "eager" : "lazy"}
                      draggable={false}
                    />
                    <span className="project-number">
                      {String(idx + 1).padStart(2, "0")} / {String(projectsData.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="stack-card__body">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="project-actions">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github size={16} />Source Code
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          Live Demo <ArrowUpRight size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation controls */}
          <div className="stack-nav">
            <button onClick={() => navigate(-1)} aria-label="Previous project" className="stack-nav__btn">
              <ChevronLeft size={20} />
            </button>

            <div className="stack-dots">
              {projectsData.map((item, idx) => (
                <button
                  key={item.id}
                  className={`stack-dot ${idx === activeIndex ? "stack-dot--active" : ""}`}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  aria-label={`Go to ${item.title}`}
                  aria-pressed={idx === activeIndex}
                >
                  <span className="stack-dot__label">{String(idx + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>

            <button onClick={() => navigate(1)} aria-label="Next project" className="stack-nav__btn">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ── Project title strip ──────────────────────── */}
        <div className="stack-titles">
          {projectsData.map((item, idx) => (
            <button
              key={item.id}
              className={`stack-title ${idx === activeIndex ? "stack-title--active" : ""}`}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
            >
              <span className="stack-title__num">{String(idx + 1).padStart(2, "0")}</span>
              <span className="stack-title__name">{item.title}</span>
              <ArrowUpRight size={14} className="stack-title__arrow" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
