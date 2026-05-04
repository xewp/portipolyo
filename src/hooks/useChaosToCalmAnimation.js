/**
 * Chaos-to-Calm Animation Hook
 * 
 * Creates scroll-triggered animations where elements start chaotic (offset, rotated, scaled, blurred)
 * and smoothly settle into calm, aligned states as they enter the viewport.
 * 
 * Usage:
 * const { containerRef, containerVariants, childVariants, isInView } = useChaosToCalmAnimation();
 * 
 * <motion.div ref={containerRef} variants={containerVariants} initial="chaos" animate={isInView ? "calm" : "chaos"}>
 *   <motion.div variants={childVariants}>Item 1</motion.div>
 *   <motion.div variants={childVariants}>Item 2</motion.div>
 * </motion.div>
 */

import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const useChaosToCalmAnimation = (options = {}) => {
  const {
    threshold = 0.2,
    once = true,
    maxOffset = 100,
    maxRotation = 20,
    staggerDelay = 0.08,
  } = options;

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once, amount: threshold });

  // Container variants for staggering children
  const containerVariants = {
    chaos: {
      transition: {
        staggerChildren: staggerDelay,
      }
    },
    calm: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      }
    }
  };

  // Individual item variants - chaos to calm
  const childVariants = {
    chaos: {
      opacity: 0.3,
      x: () => (Math.random() - 0.5) * maxOffset * 2,
      y: () => (Math.random() - 0.5) * maxOffset * 2,
      scale: () => 0.85 + Math.random() * 0.3,
      rotate: () => (Math.random() - 0.5) * maxRotation * 2,
      filter: "blur(8px)",
    },
    calm: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8,
      }
    }
  };

  // Variant for subtle idle floating in calm state
  const calmFloatingVariants = {
    chaos: {
      opacity: 0.3,
      x: () => (Math.random() - 0.5) * maxOffset * 2,
      y: () => (Math.random() - 0.5) * maxOffset * 2,
      scale: () => 0.85 + Math.random() * 0.3,
      rotate: () => (Math.random() - 0.5) * maxRotation * 2,
      filter: "blur(8px)",
    },
    calm: {
      opacity: 1,
      x: 0,
      y: [0, -5, 0],
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8,
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }
      }
    }
  };

  // Variant for title/heading elements
  const titleVariants = {
    chaos: {
      opacity: 0,
      y: -80,
      scale: 0.6,
      rotate: -15,
      filter: "blur(12px)",
    },
    calm: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
        duration: 1,
      }
    }
  };

  return {
    containerRef,
    containerVariants,
    childVariants,
    calmFloatingVariants,
    titleVariants,
    isInView,
  };
};

// Preset configurations for different animation intensities
export const chaosPresets = {
  subtle: {
    maxOffset: 50,
    maxRotation: 10,
    staggerDelay: 0.05,
  },
  medium: {
    maxOffset: 100,
    maxRotation: 20,
    staggerDelay: 0.08,
  },
  intense: {
    maxOffset: 150,
    maxRotation: 25,
    staggerDelay: 0.1,
  },
};
