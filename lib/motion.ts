import type { Variants } from "framer-motion";

export const transitionEase = [0.22, 1, 0.36, 1] as const;
export const viewport = { once: true, amount: 0.3 } as const;
export const cardSpring = { type: "spring", stiffness: 260, damping: 24 } as const;
export const cursorSpring = { stiffness: 450, damping: 35, mass: 0.5 };
export const magneticSpring = { stiffness: 250, damping: 20 };

export const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: transitionEase } },
};
export const fadeReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};
export const staggerHero: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
export const projectCardHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: cardSpring },
};
export const projectImageHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.025, transition: cardSpring },
};
export const projectArrowHover: Variants = {
  rest: { opacity: 0, x: -8 },
  hover: { opacity: 1, x: 0, transition: cardSpring },
};
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
export const modalPanel: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: transitionEase } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2, ease: transitionEase } },
};
export const modalFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
export const routeTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: transitionEase } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: transitionEase } },
};
export const routeFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
