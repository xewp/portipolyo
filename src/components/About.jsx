import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techStack = [
  { name: "MongoDB", color: "from-green-700 to-green-500", icon: "🍃" },
  { name: "Express", color: "from-gray-700 to-gray-500", icon: "⚡" },
  { name: "React", color: "from-blue-600 to-cyan-400", icon: "⚛️" },
  { name: "Node.js", color: "from-green-600 to-lime-400", icon: "🟢" },
  { name: "JavaScript", color: "from-yellow-500 to-yellow-300", icon: "📜" },
  { name: "Tailwind CSS", color: "from-cyan-500 to-blue-400", icon: "🎨" },
  { name: "Git", color: "from-orange-600 to-red-500", icon: "🔀" },
  { name: "PostgreSQL", color: "from-blue-700 to-indigo-500", icon: "🐘" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Title animation - drops in with rotation and scale (40% reduced)
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -60,
      scale: 0.7,
      rotate: -9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 120,
        duration: 1.0,
      },
    },
  };

  // Bio paragraphs - staggered line-by-line reveal (40% reduced)
  const bioContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const bioParagraphVariants = {
    hidden: {
      opacity: 0,
      x: -60,
      rotateY: -54,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.7,
      },
    },
  };

  // Tech badges - explosive entrance with bounce (40% reduced)
  const badgeContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.4,
      },
    },
  };

  const badgeVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -108,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 180,
        duration: 0.7,
      },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen py-20 px-6 bg-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Title - Dramatic entrance */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-primary to-primary flex-1"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <h2 className="text-5xl md:text-7xl font-bold text-white relative">
              About{" "}
              <span
                className="text-primary relative"
                style={{
                  textShadow:
                    "0 0 30px rgba(102, 255, 0, 0.8), 0 0 60px rgba(102, 255, 0, 0.5)",
                }}
              >
                Me
                {/* Glowing underline */}
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary"
                  style={{
                    boxShadow: "0 0 20px rgba(102, 255, 0, 0.8)",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                />
              </span>
            </h2>

            <motion.div
              className="h-1 bg-gradient-to-l from-transparent via-primary to-primary flex-1"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio Section - Line-by-line reveal */}
          <motion.div
            variants={bioContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.p
              variants={bioParagraphVariants}
              className="text-gray-100 text-xl leading-relaxed p-6 bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-primary rounded-r-lg"
              style={{
                boxShadow: "0 0 20px rgba(102, 255, 0, 0.1)",
              }}
            >
              I'm{" "}
              <span
                className="text-primary font-bold text-2xl"
                style={{
                  textShadow: "0 0 20px rgba(102, 255, 0, 0.6)",
                }}
              >
                Kaizz Bautista
              </span>
              , a CS student who builds full-stack web apps using the MERN stack.
              I got into security after realizing I was storing API keys in a
              Notepad file — so I built Vault-X to fix that.
            </motion.p>

            <motion.p
              variants={bioParagraphVariants}
              className="text-gray-100 text-xl leading-relaxed p-6 bg-gradient-to-r from-green-400/5 to-transparent border-l-4 border-green-400 rounded-r-lg"
              style={{
                boxShadow: "0 0 20px rgba(74, 222, 128, 0.1)",
              }}
            >
              I care a lot about{" "}
              <span className="text-green-400 font-semibold">
                UI feel and code architecture
              </span>
              . Most of my projects start because I encountered a real problem
              and wanted to build the solution myself instead of just using
              someone else's tool.
            </motion.p>

            <motion.p
              variants={bioParagraphVariants}
              className="text-gray-100 text-xl leading-relaxed p-6 bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-primary rounded-r-lg"
              style={{
                boxShadow: "0 0 20px rgba(102, 255, 0, 0.1)",
              }}
            >
              Currently focused on the{" "}
              <span
                className="text-primary font-bold text-2xl"
                style={{
                  textShadow: "0 0 20px rgba(102, 255, 0, 0.6)",
                }}
              >
                MERN stack
              </span>
              {" "}and sharpening my skills in authentication, encryption, and
              clean API design. Open to OJT and junior dev opportunities in PH.
            </motion.p>
          </motion.div>

          {/* Tech Stack Badges - Explosive entrance */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              className="text-3xl font-bold text-white mb-8 text-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        type: "spring",
                        damping: 15,
                        stiffness: 150,
                        delay: 0.3,
                      },
                    }
                  : {}
              }
            >
              Technologies I work with:
            </motion.h3>

            <motion.div
              variants={badgeContainerVariants}
              className="flex flex-wrap gap-4 justify-center"
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  variants={badgeVariants}
                  whileHover={{
                    scale: 1.18,
                    rotate: [0, -6, 6, -6, 0],
                    y: -6,
                    transition: {
                      rotate: {
                        duration: 0.5,
                        ease: "easeInOut",
                      },
                      scale: {
                        type: "spring",
                        damping: 15,
                        stiffness: 250,
                      },
                    },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="group relative px-6 py-3 cursor-pointer"
                  style={{
                    perspective: "1000px",
                  }}
                >
                  {/* Glowing background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-xl opacity-20 blur-sm`}
                    whileHover={{
                      opacity: 0.6,
                      scale: 1.1,
                      boxShadow: `0 0 40px rgba(102, 255, 0, 0.8)`,
                    }}
                  />

                  {/* Border glow */}
                  <motion.div
                    className="absolute inset-0 border-2 border-primary/30 rounded-xl"
                    whileHover={{
                      borderColor: "rgba(102, 255, 0, 1)",
                      boxShadow:
                        "0 0 30px rgba(102, 255, 0, 0.6), inset 0 0 30px rgba(102, 255, 0, 0.2)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative flex items-center gap-3 z-10">
                    <motion.span
                      className="text-3xl"
                      whileHover={{
                        scale: 1.3,
                        rotate: 216,
                        transition: {
                          type: "spring",
                          damping: 15,
                          stiffness: 120,
                        },
                      }}
                    >
                      {tech.icon}
                    </motion.span>
                    <span className="text-white font-bold text-lg group-hover:text-primary transition-colors duration-300">
                      {tech.name}
                    </span>
                  </div>

                  {/* Particle burst on hover */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-primary rounded-full"
                      style={{
                        top: "50%",
                        left: "50%",
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        x: [0, (Math.random() - 0.5) * 100],
                        y: [0, (Math.random() - 0.5) * 100],
                        transition: {
                          duration: 0.8,
                          delay: i * 0.1,
                        },
                      }}
                    />
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
