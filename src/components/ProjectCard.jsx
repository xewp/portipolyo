import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-dark-card border border-primary/20 rounded-xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-dark-lighter">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

        {/* Links overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary text-dark rounded-full hover:scale-110 transition-transform duration-200"
            aria-label="View GitHub repository"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary text-dark rounded-full hover:scale-110 transition-transform duration-200"
            aria-label="View live demo"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-secondary leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-dark border border-primary/30 text-primary rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
    </motion.div>
  );
};

export default ProjectCard;
