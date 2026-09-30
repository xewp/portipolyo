"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider><MotionConfig reducedMotion="user">{children}</MotionConfig></ThemeProvider>;
}
