import { motion } from "framer-motion";
import { projectsData } from "../utils/mockData";
import ProjectCard from "./ProjectCard";
import ScrollReveal, { staggerContainer } from "./ScrollReveal";

const Projects = () => {
  return (
    <section id="projects" className="relative py-32 bg-dark overflow-hidden">
      {/* Dynamic Background Noise/Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="w-full mb-24">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Featured <span className="text-gradient">Projects</span>
            </h3>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              A selection of my most challenging and rewarding work, ranging from complex full-stack systems to elegant frontend experiments.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* View More Call to Action */}
        <ScrollReveal className="w-full mt-20 flex justify-center">
            <motion.a
                href="https://github.com/xewp"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
            >
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" className="w-6 h-6 invert" alt="Github" />
                <span>See More on GitHub</span>
            </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Projects;
