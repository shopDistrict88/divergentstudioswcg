import type { SceneAnimation, SceneAnimationType } from "@/lib/scenes/types";
import type { TargetAndTransition, Transition } from "framer-motion";

const ease = [0.33, 1, 0.68, 1] as const;

function baseTransition(duration: number, delay = 0): Transition {
  return { duration, delay, ease, repeat: Infinity, repeatType: "mirror" };
}

/**
 * Subtle idle motion for living layers.
 * Intensities stay low — premium exhibition feel, not a game.
 */
export function getIdleAnimation(
  animation: SceneAnimation | undefined,
  reducedMotion: boolean
): TargetAndTransition | undefined {
  if (!animation || animation.type === "none" || reducedMotion) return undefined;

  const duration = animation.duration ?? 6;
  const intensity = animation.intensity ?? 0.3;
  const delay = animation.delay ?? 0;

  const variants: Record<SceneAnimationType, TargetAndTransition> = {
    none: {},
    float: {
      y: [0, -3 * intensity, 0],
      transition: baseTransition(duration, delay),
    },
    sway: {
      rotate: [-1.2 * intensity, 1.2 * intensity, -1.2 * intensity],
      x: [-1.5 * intensity, 1.5 * intensity, -1.5 * intensity],
      transition: baseTransition(duration, delay),
    },
    pulse: {
      opacity: [0.65, 0.65 + 0.35 * intensity, 0.65],
      scale: [1, 1 + 0.015 * intensity, 1],
      transition: baseTransition(duration, delay),
    },
    flicker: {
      opacity: [0.72, 1, 0.78, 0.96, 0.7, 1, 0.82, 0.94],
      transition: {
        duration: Math.max(duration * 3.5, 2),
        delay,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    /** Occasional bright flash (camera charge / strobe), mostly idle */
    flash: {
      opacity: [
        0, 0, 0, 0, 0, 0, 0, 0, 0.85, 0.15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      transition: {
        duration: Math.max(duration, 8),
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    drift: {
      x: ["-2%", "2%", "-2%"],
      y: ["-0.8%", "0.8%", "-0.8%"],
      transition: baseTransition(duration, delay),
    },
    rotate: {
      rotate: [0, 360],
      transition: {
        duration,
        delay,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    steam: {
      y: [0, -16 * intensity, -32 * intensity],
      opacity: [0.15, 0.28 * intensity, 0],
      scale: [1, 1.08, 1.16],
      transition: {
        duration,
        delay,
        ease,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    scan: {
      y: ["18%", "82%", "18%"],
      opacity: [0.25, 0.7 * intensity, 0.25],
      transition: baseTransition(duration, delay),
    },
  };

  return variants[animation.type];
}

/** Pivot point for hanging / swaying elements (top-center). */
export function getTransformOrigin(
  animation: SceneAnimation | undefined
): string | undefined {
  if (!animation) return undefined;
  if (animation.type === "sway") return "50% 0%";
  if (animation.type === "rotate") return "50% 50%";
  return undefined;
}
