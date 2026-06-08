import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

        <div className="max-w-3xl mx-auto">
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
              , an IT student who once stored API keys in a Notepad file — then
              built{" "}
              <span className="text-primary font-semibold">Vault-X</span>, a
              secret manager with client-side AES-256 encryption, to make sure
              that never happens again.
            </motion.p>

            <motion.p
              variants={bioParagraphVariants}
              className="text-gray-100 text-xl leading-relaxed p-6 bg-gradient-to-r from-green-400/5 to-transparent border-l-4 border-green-400 rounded-r-lg"
              style={{
                boxShadow: "0 0 20px rgba(74, 222, 128, 0.1)",
              }}
            >
              Every project I build started as a{" "}
              <span className="text-green-400 font-semibold">
                real problem I wanted to solve
              </span>
              . JWT auth flows, Cloudinary uploads, Supabase integrations,
              Leaflet maps — I learn by shipping, not by watching tutorials.
            </motion.p>

            <motion.p
              variants={bioParagraphVariants}
              className="text-gray-100 text-xl leading-relaxed p-6 bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-primary rounded-r-lg"
              style={{
                boxShadow: "0 0 20px rgba(102, 255, 0, 0.1)",
              }}
            >
              Graduating soon and looking for my{" "}
              <span
                className="text-primary font-bold text-2xl"
                style={{
                  textShadow: "0 0 20px rgba(102, 255, 0, 0.6)",
                }}
              >
                first dev role
              </span>
              {" "}— somewhere I can ship real features, break things in staging,
              and learn from engineers who've been doing this longer than me.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
