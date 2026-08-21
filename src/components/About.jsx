import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.07, delayChildren: 0.05 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" ref={ref} className="py-24 px-4 sm:px-6">
      <motion.div
        className="max-w-reading mx-auto"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {/* Section label */}
        <motion.p variants={fadeUp} className="section-label mb-3">
          01 — about
        </motion.p>

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          className="font-pixel text-[2rem] sm:text-[2.5rem] lowercase leading-none text-ink mb-8"
        >
          about
        </motion.h2>

        {/* Hairline */}
        <motion.div variants={fadeUp} className="h-px bg-gray-200 mb-8" />

        {/* Body — Source Serif for reading */}
        <div className="space-y-5">
          <motion.p
            variants={fadeUp}
            className="font-serif text-long-body text-gray-500 leading-relaxed"
          >
            I'm <span className="text-ink font-semibold">Kaizz Bautista</span>, a developer who believes the future of engineering lies in the synergy between human creativity and AI acceleration. I don't just write code; I design prompt pipelines, orchestrate custom AI agent workflows, and leverage LLMs to maximize my shipping velocity and code quality.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-serif text-long-body text-gray-500 leading-relaxed"
          >
            Every project I build originates from a concrete problem worth solving. By pairing full-stack architecture with AI-driven development workflows, I rapidly transform complex concepts into production-ready applications. From structuring scalable backend APIs and database schemas to crafting fluid, responsive frontend interactions, I focus on building systems that are both resilient and high-performing.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-serif text-long-body text-gray-500 leading-relaxed"
          >
            Software development is evolving faster than ever, and I stay at the leading edge by continuously experimenting with emerging AI tools, refining agent architectures, and discovering new ways to streamline complex workflows. I am committed to exploring the full potential of <span className="text-ink font-medium">AI-augmented engineering</span>—pushing technical boundaries to see just how fast, intelligent, and impactful modern web software can become.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
