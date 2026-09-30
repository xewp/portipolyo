"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { magneticSpring } from "../../lib/motion";

type MagneticLinkProps = Omit<HTMLMotionProps<"a">, "href" | "children"> & {
  href: string;
  children: ReactNode;
};

export function MagneticLink({
  href,
  children,
  style,
  target,
  rel,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, magneticSpring);
  const springY = useSpring(y, magneticSpring);

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    onMouseMove?.(event);
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - rect.left - rect.width / 2) / Math.max(rect.width / 2, 1);
    const vertical = (event.clientY - rect.top - rect.height / 2) / Math.max(rect.height / 2, 1);
    x.set(Math.max(-6, Math.min(6, horizontal * 6)));
    y.set(Math.max(-6, Math.min(6, vertical * 6)));
  }

  function handleMouseLeave(event: MouseEvent<HTMLAnchorElement>) {
    x.set(0);
    y.set(0);
    onMouseLeave?.(event);
  }

  return (
    <motion.a
      {...props}
      href={href}
      target={target}
      rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
      data-cursor="large"
      style={{ ...style, x: reduceMotion ? 0 : springX, y: reduceMotion ? 0 : springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}
