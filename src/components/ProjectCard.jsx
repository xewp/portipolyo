import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
      }}
      className="group relative h-full flex flex-col bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/[0.08] transition-all duration-500"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(102,255,0,0.15)_0%,transparent_50%)]" />
      </div>

      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden m-4 rounded-[1.5rem]">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Modern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Tech Stack Pills (Floating) */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-dark/60 backdrop-blur-md border border-white/10 text-white rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-primary text-dark rounded-full">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 pt-2 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          <div className="flex gap-3 translate-y-1">
             <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#66ff00" }}
                className="text-white/40 hover:text-primary transition-colors"
              >
                <Github size={20} />
              </motion.a>
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: "#66ff00" }}
                  className="text-white/40 hover:text-primary transition-colors"
                >
                  <ExternalLink size={20} />
                </motion.a>
              )}
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
          {project.description}
        </p>

        {/* Action Button */}
        <div className="mt-auto">
          <motion.a
            href={project.live || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary group/link"
          >
            <span>View Case Study</span>
            <ArrowUpRight size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </motion.a>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/20 rounded-[2rem] transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;
