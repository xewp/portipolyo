"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { routeFade, routeTransition } from "../../lib/motion";

export function RouteTransition({ children, routeKey = "portfolio" }: { children: ReactNode; routeKey?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        variants={reduceMotion ? routeFade : routeTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
