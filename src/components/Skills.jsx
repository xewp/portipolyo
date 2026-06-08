import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { skillsData } from "../utils/mockData";

const SkillBadge = ({ skill, index, isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -15 }}
      animate={
        isVisible
          ? {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: index * 0.06,
              },
            }
          : {}
      }
      whileHover={{
        scale: 1.1,
        y: -4,
        transition: { type: "spring", damping: 15, stiffness: 300 },
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center gap-3 px-5 py-3 bg-dark border border-primary/20 rounded-xl cursor-default hover:border-primary/60 transition-colors duration-300"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />

      <span className="text-xl relative z-10">{skill.icon}</span>
      <span className="text-gray-light font-medium relative z-10 group-hover:text-white transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
};

const SkillCategory = ({ title, skills, isVisible, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-dark-card border border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-colors duration-300"
    >
      <h3 className="text-2xl font-bold text-primary mb-6">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <SkillBadge
            key={skill.name}
            skill={skill}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen py-20 px-6 bg-dark-lighter"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              My <span className="text-primary">Skills</span>
            </h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-primary to-transparent"></div>
          </div>
          <p className="text-gray-secondary text-lg">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCategory
            title="Frontend"
            skills={skillsData.frontend}
            isVisible={isVisible}
            delay={0.2}
          />
          <SkillCategory
            title="Backend"
            skills={skillsData.backend}
            isVisible={isVisible}
            delay={0.3}
          />
          <SkillCategory
            title="Tools & Others"
            skills={skillsData.tools}
            isVisible={isVisible}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
