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
            Every project I build starts with a real-world problem. Whether implementing AES-256 client-side encryption for <span className="text-ink font-medium">Vault-X</span> or building complex real-time booking flows, I use AI pair-programming to tackle complex architectures, optimize database schemas, and debug edge cases at speed.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-serif text-long-body text-gray-500 leading-relaxed"
          >
            Graduating soon and looking for a forward-thinking <span className="text-ink font-semibold">first developer role</span> where I can bring both my full-stack MERN expertise and my proficiency in maximizing AI productivity to build next-generation software.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
