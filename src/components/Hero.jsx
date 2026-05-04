import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  // Create parallax transforms
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const xPercent = (e.clientX - centerX) / (rect.width / 2);
      const yPercent = (e.clientY - centerY) / (rect.height / 2);

      mouseX.set(xPercent);
      mouseY.set(yPercent);
      setMousePosition({ x: xPercent * 20, y: yPercent * 20 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Animated 3D Grid Background */}
      <div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(102,255,0,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(102,255,0,0.1)_2px,transparent_2px)] bg-[size:100px_100px]"
          style={{
            transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`,
            transformStyle: "preserve-3d",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_70%)]"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content with 3D transforms */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Greeting with floating animation */}
          <motion.p
            className="text-primary text-lg md:text-xl mb-4 font-medium relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              transform: `translateZ(50px)`,
              textShadow:
                "0 0 20px rgba(102, 255, 0, 0.5), 0 0 40px rgba(102, 255, 0, 0.3)",
            }}
          >
            <motion.span
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Hi, my name is
            </motion.span>
          </motion.p>

          {/* Name with 3D effect and neon glow */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 relative"
            initial={{ opacity: 0, scale: 0.5, rotateX: -30 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
            }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
            style={{
              transform: "translateZ(100px)",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-green-400 to-primary bg-[length:200%_100%]"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                y: [0, -8, 0],
              }}
              transition={{
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              style={{
                filter:
                  "drop-shadow(0 0 30px rgba(102, 255, 0, 0.6)) drop-shadow(0 0 60px rgba(102, 255, 0, 0.4))",
              }}
            >
              Kaizz Bautista
            </motion.span>
          </motion.h1>

          {/* Role with wave animation */}
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              transform: "translateZ(75px)",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
            }}
          >
            {["Full", "Stack", "Developer"].map((word, index) => (
              <motion.span
                key={word}
                className="inline-block mr-4"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          {/* Tagline with depth */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, z: -100 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              transform: "translateZ(25px)",
            }}
          >
            CS student who got tired of storing API keys in Notepad — so I built{" "}
            <span
              className="text-primary font-semibold"
              style={{ textShadow: "0 0 10px rgba(102, 255, 0, 0.5)" }}
            >
              Vault-X
            </span>
            . I build full-stack apps with the MERN stack and ship things that
            actually work.
          </motion.p>

          {/* CTA Buttons with 3D hover effects */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center flex-wrap"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{
              transform: "translateZ(50px)",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.button
              onClick={scrollToProjects}
              className="group relative px-8 py-4 bg-transparent border-2 border-primary text-primary font-semibold rounded-lg overflow-hidden transition-all duration-300 w-full sm:w-auto"
              whileHover={{
                scale: 1.05,
                rotateX: "10deg",
                rotateY: "-10deg",
                boxShadow: "0 20px 40px rgba(102, 255, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <span className="relative z-10">View My Work</span>
              <motion.span
                className="absolute inset-0 bg-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.button>

            <motion.button
              onClick={scrollToContact}
              className="px-8 py-4 bg-primary text-black font-semibold rounded-lg w-full sm:w-auto relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                rotateX: "-10deg",
                rotateY: "10deg",
                boxShadow: "0 20px 50px rgba(102, 255, 0, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 0 20px rgba(102, 255, 0, 0.6))",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                style={{ opacity: 0.3 }}
              />
              Get In Touch
            </motion.button>

            {/* Resume Download Button */}
            <motion.a
              href="/Kaizz_Bautista_Resume.pdf"
              download
              className="group flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/30 text-white/70 font-semibold rounded-lg hover:border-primary/60 hover:text-primary transition-all duration-300 w-full sm:w-auto"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(102, 255, 0, 0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with bounce */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={scrollToProjects}
        whileHover={{ scale: 1.2 }}
        style={{
          filter: "drop-shadow(0 0 10px rgba(102, 255, 0, 0.8))",
        }}
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </motion.div>
    </section>
  );
};

export default Hero;
