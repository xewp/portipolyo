import { motion } from "framer-motion";

export const revealVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    filter: "blur(10px)",
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    filter: "blur(10px)",
    scale: 0.95,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const ScrollReveal = ({ children, width = "fit-content", className = "" }) => {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.2 }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
