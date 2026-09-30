"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cursorSpring } from "../../lib/motion";

const cursorQuery = "(pointer: fine) and (hover: hover) and (min-width: 1024px)";
const interactiveSelector = "[data-cursor='large'], a, button, input, textarea, select, [role='button']";

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(0.375);
  const opacity = useMotionValue(0);
  const springX = useSpring(x, cursorSpring);
  const springY = useSpring(y, cursorSpring);
  const springScale = useSpring(scale, cursorSpring);

  useEffect(() => {
    const query = window.matchMedia(cursorQuery);
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || reduceMotion) return;

    function move(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      x.set(event.clientX);
      y.set(event.clientY);
      opacity.set(1);
      const element = event.target instanceof Element ? event.target : null;
      scale.set(element?.closest(interactiveSelector) ? 1 : 0.375);
    }

    function leave(event: PointerEvent) {
      if (!event.relatedTarget) opacity.set(0);
    }

    function hide() {
      opacity.set(0);
    }

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, reduceMotion, x, y, scale, opacity]);

  if (!enabled || reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed -left-6 -top-6 z-[100] h-12 w-12 rounded-full border border-accent/70 bg-accent/10"
      style={{ x: springX, y: springY, scale: springScale, opacity }}
    />
  );
}
