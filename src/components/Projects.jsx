import { motion } from "framer-motion";
import { useChaosToCalmAnimation } from "../hooks/useChaosToCalmAnimation";
import { projectsData } from "../utils/mockData";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const {
    containerRef,
    containerVariants,
    childVariants,
    titleVariants,
    isInView,
  } = useChaosToCalmAnimation({
    threshold: 0.15,
    maxOffset: 120,
    maxRotation: 22,
    staggerDelay: 0.1,
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="min-h-screen py-20 px-6 bg-black relative overflow-hidden"
    >
      {/* Background chaos particles that calm down */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={
              isInView
                ? {
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.5, 1],
                  }
                : {
                    opacity: 0,
                  }
            }
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Title - Chaos to Calm */}
        <motion.div
          variants={titleVariants}
          initial="chaos"
          animate={isInView ? "calm" : "chaos"}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-6 mb-4">
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-primary to-primary flex-1"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
              }
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <h2
              className="text-4xl md:text-5xl font-bold text-white"
              style={{
                textShadow: isInView
                  ? "0 0 20px rgba(102, 255, 0, 0.5)"
                  : "0 0 40px rgba(102, 255, 0, 0.8)",
              }}
            >
              Featured <span className="text-primary">Projects</span>
            </h2>

            <motion.div
              className="h-1 bg-gradient-to-l from-transparent via-primary to-primary flex-1"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
              }
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>

          <motion.p
            className="text-gray-secondary text-lg max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={
              isInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Here are some of my recent projects that showcase my skills in
            full-stack development, UI/UX design, and problem-solving.
          </motion.p>
        </motion.div>

        {/* Projects Grid - Chaos to Calm */}
        <motion.div
          variants={containerVariants}
          initial="chaos"
          animate={isInView ? "calm" : "chaos"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              variants={childVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: {
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                },
              }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
