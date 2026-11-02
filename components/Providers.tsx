"use client";

import { MotionConfig } from "framer-motion";

/** Motion defaults: animations follow the visitor's reduced-motion setting. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
