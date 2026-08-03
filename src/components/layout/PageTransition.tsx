"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useHydrated } from "@/hooks/useHydrated";

/** Light page enter fade — skips initial styles until hydrated */
export default function PageTransition({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();

  if (!hydrated || reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
