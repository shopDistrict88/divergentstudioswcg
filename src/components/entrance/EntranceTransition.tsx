"use client";

import { motion } from "framer-motion";
import { entranceConfig } from "@/lib/entranceConfig";
import { useReducedMotion } from "@/components/living-scene/use-reduced-motion";

type EntranceTransitionProps = {
  active: boolean;
  onComplete?: () => void;
};

/**
 * Forward doorway transition — scale + shadow close + dark wipe.
 * Grain continues via parent FilmGrain.
 */
export default function EntranceTransition({
  active,
  onComplete,
}: EntranceTransitionProps) {
  const reduced = useReducedMotion();
  const duration = entranceConfig.transitionDurationMs / 1000;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[50] overflow-hidden"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduced ? 0.25 : duration * 0.35 }}
      onAnimationComplete={() => {
        if (active) onComplete?.();
      }}
      aria-hidden
    >
      {/* Closing shadows */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{
          duration: reduced ? 0.3 : duration,
          ease: [0.33, 1, 0.68, 1],
        }}
      />
      {!reduced && (
        <motion.div
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-black via-black/80 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: active ? "120%" : "-100%" }}
          transition={{
            duration: duration * 0.9,
            ease: [0.33, 1, 0.68, 1],
          }}
        />
      )}
    </motion.div>
  );
}
