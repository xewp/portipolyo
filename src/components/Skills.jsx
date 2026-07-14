import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillsData } from "../utils/mockData";

const SkillCategory = ({ title, skills, variants }) => (
  <div>
    <p className="micro-label text-gray-400 dark:text-gray-500 tracking-wider mb-4">{title}</p>
    <div className="flex flex-wrap gap-2.5">
      {skills.map((skill) => (
        <motion.span
          key={skill}
          variants={variants}
          className="px-4 py-2 bg-gray-50/30 dark:bg-gray-100/10 border border-gray-200/60 dark:border-gray-200/10 hover:border-gray-400 dark:hover:border-gray-200/40 rounded-lg text-ink font-mono text-ui-small transition-colors duration-200 cursor-default"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </div>
);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.05, delayChildren: 0.05 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="skills" ref={ref} className="py-24 px-4 sm:px-6">
      <motion.div
        className="max-w-reading mx-auto"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {/* Section label */}
        <motion.p variants={fadeUp} className="section-label mb-3">
          03 — skills
        </motion.p>

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          className="font-pixel text-[2rem] sm:text-[2.5rem] lowercase leading-none text-ink mb-8"
        >
          skills
        </motion.h2>

        {/* Hairline */}
        <motion.div variants={fadeUp} className="h-px bg-gray-200/80 dark:bg-gray-200/10 mb-8" />

        {/* Skill groups stacked vertically with generous spacing */}
        <div className="space-y-8">
          <motion.div variants={fadeUp}>
            <SkillCategory
              title="Frontend"
              skills={skillsData.frontend}
              variants={fadeUp}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <SkillCategory
              title="Backend"
              skills={skillsData.backend}
              variants={fadeUp}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <SkillCategory
              title="AI & Machine Learning"
              skills={skillsData.ai}
              variants={fadeUp}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <SkillCategory
              title="Developer Tools"
              skills={skillsData.tools}
              variants={fadeUp}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
