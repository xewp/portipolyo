import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import { projectsData } from "../utils/mockData";
import ProjectCard from "./ProjectCard";

/* ── Spring configs ──────────────────────────────────────── */
const cardSpring = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.8,
};

/* ── Section header fade-up variant ──────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

/* ── Projects Component ──────────────────────────────────── */
const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cardWidth, setCardWidth] = useState(420);
  const [deckReady, setDeckReady] = useState(false);

  const total = projectsData.length;
  const activeProject = projectsData[activeIndex];

  /* ── Responsive card width ─────────────────────────────── */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setCardWidth(Math.round(w * 0.9));
      else if (w < 1024) setCardWidth(360);
      else setCardWidth(420);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Delayed entrance: cards fan out after header enters ── */
  useEffect(() => {
    if (isInView && !deckReady) {
      const timer = setTimeout(() => setDeckReady(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, deckReady]);

  /* ── Navigation ────────────────────────────────────────── */
  const navigate = useCallback(
    (dir) => {
      setActiveIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return total - 1;
        if (next >= total) return 0;
        return next;
      });
    },
    [total]
  );

  /* ── Keyboard ──────────────────────────────────────────── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") navigate(-1);
      else if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  /* ── Touch swipe ───────────────────────────────────────── */
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) navigate(dx > 0 ? 1 : -1);
  };

  /* ── Card position calculator ──────────────────────────── */
  const getCardStyle = (index) => {
    const offset = index - activeIndex;

    // Circular wrapping for smooth carousel
    let norm = offset;
    if (Math.abs(offset) > total / 2) {
      norm = offset > 0 ? offset - total : offset + total;
    }

    const abs = Math.abs(norm);
    const sign = norm > 0 ? 1 : norm < 0 ? -1 : 0;
    const isMobile = window.innerWidth < 768;

    let x, y, rotate, scale, opacity;

    if (isMobile) {
      switch (abs) {
        case 0:
          x = 0;
          y = 0;
          rotate = 0;
          scale = 1;
          opacity = 1;
          break;
        case 1:
          x = sign * (cardWidth * 0.28);
          y = 8;
          rotate = sign * 12; // Rotated ±10-15 degrees
          scale = 0.9;        // Scaled to about 0.9
          opacity = 0.6;      // Underneath, peeking out
          break;
        default:
          x = sign * (cardWidth * 0.5);
          y = 15;
          rotate = sign * 15;
          scale = 0.8;
          opacity = 0;        // Keep other cards hidden
      }
    } else {
      switch (abs) {
        case 0:
          x = 0;
          y = 0;
          rotate = 0;
          scale = 1;
          opacity = 1;
          break;
        case 1:
          x = sign * 280;
          y = 15;
          rotate = sign * 5;
          scale = 0.9;
          opacity = 0.7;
          break;
        case 2:
          x = sign * 460;
          y = 25;
          rotate = sign * 9;
          scale = 0.8;
          opacity = 0.35;
          break;
        default:
          x = sign * 550;
          y = 30;
          rotate = sign * 12;
          scale = 0.7;
          opacity = 0;
      }
    }

    // Hover adjustments (only if desktop)
    if (!isMobile && hoveredIndex === index && abs <= 2) {
      y -= 8;
      scale += 0.03;
      rotate *= 0.6;
      opacity = Math.min(opacity + 0.2, 1);
    }

    const zIndex = abs === 0 ? 40 : abs === 1 ? 30 : abs === 2 ? 20 : 10;

    return { x, y, rotate, scale, opacity, zIndex };
  };

  /* ── Deck height (responsive) ──────────────────────────── */
  const deckHeight = cardWidth >= 420 ? 540 : cardWidth >= 360 ? 500 : 460;

  /* ── Render ────────────────────────────────────────────── */
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* ── Section Header ─────────────────────────────── */}
      <motion.div
        className="max-w-wide mx-auto"
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={staggerContainer}
      >
        <motion.p variants={fadeUp} className="section-label mb-3">
          02 — projects
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-pixel text-[2rem] sm:text-[2.5rem] lowercase leading-none text-ink mb-3"
        >
          projects
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-serif text-ui-body text-gray-500 mb-8 max-w-reading"
        >
          A selection of recent work. Click a card to bring it forward.
        </motion.p>

        <motion.div variants={fadeUp} className="h-px bg-gray-200 mb-10" />
      </motion.div>

      {/* ── Card Deck ──────────────────────────────────── */}
      <div className="relative" style={{ minHeight: deckHeight }}>
        {/* Navigation arrows */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full border border-gray-200/50 bg-background/80 backdrop-blur-sm text-gray-400 hover:text-ink hover:border-gray-300 transition-all duration-200"
          aria-label="Previous project"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() => navigate(1)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full border border-gray-200/50 bg-background/80 backdrop-blur-sm text-gray-400 hover:text-ink hover:border-gray-300 transition-all duration-200"
          aria-label="Next project"
        >
          <ChevronRight size={18} />
        </button>

        {/* Deck area */}
        <div
          className="relative w-full"
          style={{ height: deckHeight }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Project showcase"
          aria-roledescription="carousel"
          tabIndex={0}
        >
          {projectsData.map((project, i) => {
            const pos = deckReady
              ? getCardStyle(i)
              : { x: 0, y: 30, rotate: 0, scale: 0.85, opacity: 0, zIndex: 10 };

            const isActive = i === activeIndex;

            return (
              <div
                key={project.id}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: cardWidth,
                  zIndex: pos.zIndex,
                  transform: "translate(-50%, -50%)",
                  pointerEvents: pos.opacity > 0 ? "auto" : "none",
                }}
              >
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? { opacity: pos.opacity }
                      : {
                          x: pos.x,
                          y: pos.y,
                          rotate: pos.rotate,
                          scale: pos.scale,
                          opacity: pos.opacity,
                        }
                  }
                  transition={cardSpring}
                  onClick={() => {
                    if (!isActive) setActiveIndex(i);
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={isActive ? "cursor-default" : "cursor-pointer"}
                  aria-label={`${project.title}${isActive ? " (active)" : ""}`}
                  role="group"
                >
                  <ProjectCard
                    project={project}
                    isActive={isActive}
                    index={i}
                    total={total}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Indicators ─────────────────────────────────── */}
      <motion.div
        className="flex items-center justify-center gap-6 mt-8"
        initial={{ opacity: 0 }}
        animate={deckReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Dots */}
        <div className="flex items-center gap-2">
          {projectsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`
                rounded-full transition-all duration-300
                ${
                  i === activeIndex
                    ? "w-5 h-2 bg-ink"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }
              `}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="font-mono text-micro text-gray-400 uppercase tracking-wider">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </motion.div>

      {/* ── Active Project Action Links ────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="flex justify-center gap-3 mt-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeProject.github && (
            <a
              href={activeProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full font-mono text-micro-xs uppercase tracking-wider text-gray-500 hover:text-ink hover:border-gray-400 transition-all duration-200 no-underline"
            >
              <Github size={13} />
              Source Code
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          )}
          {activeProject.live && (
            <a
              href={activeProject.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-ink text-background rounded-full font-mono text-micro-xs uppercase tracking-wider hover:opacity-90 transition-all duration-200 no-underline"
            >
              <ExternalLink size={13} />
              Live Demo
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Projects;
