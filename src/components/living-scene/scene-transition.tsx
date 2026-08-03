"use client";

import { motion } from "framer-motion";
import type { SceneTransition } from "@/lib/scenes/types";

type SceneTransitionOverlayProps = {
  transition: SceneTransition;
  phase: "enter" | "exit";
  onComplete?: () => void;
};

const ease = [0.33, 1, 0.68, 1] as const;

export default function SceneTransitionOverlay({
  transition,
  phase,
  onComplete,
}: SceneTransitionOverlayProps) {
  const duration = transition.duration;
  const exiting = phase === "exit";

  if (transition.type === "fade") {
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[200] bg-black"
        initial={{ opacity: exiting ? 0 : 1 }}
        animate={{ opacity: exiting ? 1 : 0 }}
        transition={{ duration, ease }}
        onAnimationComplete={onComplete}
      />
    );
  }

  if (transition.type === "blur") {
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[200] bg-black/50 backdrop-blur-2xl"
        initial={{ opacity: exiting ? 0 : 1 }}
        animate={{ opacity: exiting ? 1 : 0 }}
        transition={{ duration, ease }}
        onAnimationComplete={onComplete}
      />
    );
  }

  if (transition.type === "scale") {
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[200] overflow-hidden bg-black"
        initial={{ opacity: exiting ? 0 : 1 }}
        animate={{ opacity: exiting ? 1 : 0 }}
        transition={{ duration: duration * 0.55, ease }}
        onAnimationComplete={onComplete}
      >
        <motion.div
          className="absolute inset-0 bg-[#050505]"
          initial={{ scale: exiting ? 1 : 1.06 }}
          animate={{ scale: exiting ? 1.06 : 1 }}
          transition={{ duration, ease }}
        />
      </motion.div>
    );
  }

  if (transition.type === "light-sweep") {
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[200] overflow-hidden bg-black/70"
        initial={{ opacity: exiting ? 0 : 1 }}
        animate={{ opacity: exiting ? 1 : 0 }}
        transition={{ duration: duration * 0.35, ease }}
        onAnimationComplete={onComplete}
      >
        <motion.div
          className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-white/18 to-transparent"
          initial={{ x: exiting ? "-40%" : "120%" }}
          animate={{ x: exiting ? "140%" : "180%" }}
          transition={{ duration, ease }}
        />
      </motion.div>
    );
  }

  return null;
}

export function getDefaultTransition(): SceneTransition {
  return { type: "fade", duration: 0.9 };
}
