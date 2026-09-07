import { motion } from "framer-motion";

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  /* Stagger config */
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
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Halftone background accent — fades out radially */}
      <div
        className="absolute inset-0 halftone opacity-[0.04] pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-reading mx-auto px-4 sm:px-6 py-20 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Micro label */}
        <motion.p variants={fadeUp} className="micro-label mb-6">
          hi, my name is
        </motion.p>

        {/* Name — pixel font display heading */}
        <motion.h1
          variants={fadeUp}
          className="font-pixel text-page-title sm:text-[4rem] lg:text-[5rem] leading-none lowercase mb-4 text-ink"
        >
          kaizz bautista
        </motion.h1>

        {/* Role */}
        <motion.h2
          variants={fadeUp}
          className="font-sans text-xl sm:text-2xl font-semibold text-ink/80 mb-6 tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          Full Stack Developer
        </motion.h2>

        {/* Hairline divider */}
        <motion.div
          variants={fadeUp}
          className="w-16 h-px bg-gray-200 mx-auto mb-6"
        />

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="font-serif text-long-body text-gray-500 max-w-lg mx-auto mb-10"
        >
          I ship <span className="text-ink font-medium">MERN stack</span> apps — from encrypted secret managers to booking platforms.
          If it needs auth, real-time data, or a clean UI, I've probably built it at 2 AM.
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary: inverted ink button */}
          <button
            onClick={scrollToProjects}
            className="px-6 py-2.5 bg-ink text-background text-ui-small font-medium rounded-input hover:opacity-90 transition-opacity duration-200"
          >
            View My Work
          </button>

          {/* Secondary: text link with arrow */}
          <button
            onClick={scrollToContact}
            className="group flex items-center gap-1.5 font-mono text-ui-small text-gray-500 hover:text-ink transition-colors duration-200"
          >
            Get in Touch
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>

          {/* Resume: text link */}
          <a
            href="/bautista-kaizz-resume.pdf"
            download="Kaizz_Bautista_Resume.pdf"
            className="group flex items-center gap-1.5 font-mono text-ui-small text-gray-400 hover:text-ink transition-colors duration-200 no-underline"
          >
            Download CV
            <span className="inline-block transition-transform duration-200 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="micro-label cursor-pointer" onClick={scrollToProjects}>
          scroll ↓
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
