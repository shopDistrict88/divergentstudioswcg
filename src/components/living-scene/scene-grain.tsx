"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "./use-reduced-motion";

export default function SceneGrain() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="living-scene-grain pointer-events-none absolute inset-0 z-[55]"
      aria-hidden
      animate={
        reducedMotion
          ? { opacity: 0.06 }
          : {
              opacity: [0.05, 0.08, 0.06, 0.09, 0.05],
              x: [0, -1, 1, 0],
              y: [0, 1, -1, 0],
            }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.8, repeat: Infinity, ease: "linear" }
      }
    />
  );
}
