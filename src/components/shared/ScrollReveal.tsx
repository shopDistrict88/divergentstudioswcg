"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useHydrated } from "@/hooks/useHydrated";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Fade-up reveal on scroll — defers motion until after hydration */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 32,
}: Props) {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();

  if (!hydrated || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
