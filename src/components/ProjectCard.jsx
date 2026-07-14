import { ExternalLink, Github } from "lucide-react";

/**
 * Glass card for the project deck.
 * Pure presentational — all animation is handled by the parent.
 */
const ProjectCard = ({ project, isActive, index }) => {
  return (
    <div
      className={`
        overflow-hidden rounded-[24px] backdrop-blur-xl
        border transition-all duration-500 ease-bryl
        ${
          isActive
            ? "bg-gray-50/90 dark:bg-gray-100/70 border-gray-200/60 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.5)]"
            : "bg-gray-50/70 dark:bg-gray-100/40 border-gray-200/30 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.12)]"
        }
      `}
    >
      {/* ── Image ──────────────────────────────────────── */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={project.image}
          alt={project.title}
          draggable={false}
          className={`
            w-full h-full object-cover
            transition-all duration-700 ease-bryl
            ${isActive ? "grayscale-0 scale-100" : "grayscale scale-[1.02]"}
          `}
        />

        {/* Gradient vignette */}
        <div
          className={`
            absolute inset-0
            bg-gradient-to-t from-black/30 via-transparent to-transparent
            transition-opacity duration-500
            ${isActive ? "opacity-40" : "opacity-60"}
          `}
        />

        {/* Number badge */}
        <div className="absolute top-4 left-4">
          <span className="chip-inverted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────── */}
      <div className="p-5 sm:p-6 space-y-3">
        <h3 className="text-base sm:text-lg font-semibold text-ink tracking-tight leading-tight">
          {project.title}
        </h3>

        <p
          className={`
            text-ui-small leading-relaxed transition-colors duration-500
            ${isActive ? "text-gray-500" : "text-gray-400 line-clamp-2"}
          `}
        >
          {project.description}
        </p>

        {/* Tech pills — truncated on non-active cards */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {(isActive ? project.tech : project.tech.slice(0, 4)).map((t) => (
            <span
              key={t}
              className={`
                pill transition-all duration-300
                ${isActive ? "border-gray-300/80" : "border-gray-300/40"}
              `}
            >
              {t}
            </span>
          ))}
          {!isActive && project.tech.length > 4 && (
            <span className="pill border-gray-300/40">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
