import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { skillsData } from "../utils/mockData";
import { useEffect, useState } from "react";

const SkillBar = ({ skill, index, isVisible }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(skill.level);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.level, index]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-light font-medium">{skill.name}</span>
        <span className="text-primary font-semibold">{skill.level}%</span>
      </div>
      <div className="h-3 bg-dark-card rounded-full overflow-hidden border border-primary/20">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </motion.div>
      </div>
    </div>
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
          {/* Frontend Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-dark-card border border-primary/20 rounded-xl p-6 hover:border-primary transition-colors duration-300"
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Frontend</h3>
            <div className="space-y-4">
              {skillsData.frontend.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </motion.div>

          {/* Backend Skills */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-dark-card border border-primary/20 rounded-xl p-6 hover:border-primary transition-colors duration-300"
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Backend</h3>
            <div className="space-y-4">
              {skillsData.backend.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </motion.div>

          {/* Tools & Others */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-dark-card border border-primary/20 rounded-xl p-6 hover:border-primary transition-colors duration-300"
          >
            <h3 className="text-2xl font-bold text-primary mb-6">
              Tools & Others
            </h3>
            <div className="space-y-4">
              {skillsData.tools.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
