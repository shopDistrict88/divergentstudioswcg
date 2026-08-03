"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

type SceneFlashlightProps = {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  intensity?: number;
  color?: string;
  enabled?: boolean;
};

/**
 * Soft cursor-reactive lighting — reveals nearby detail without a gaming flashlight look.
 */
export default function SceneFlashlight({
  cursorX,
  cursorY,
  intensity = 0.35,
  color = "rgba(255, 248, 230, 0.12)",
  enabled = true,
}: SceneFlashlightProps) {
  const background = useTransform(
    [cursorX, cursorY],
    ([x, y]: number[]) =>
      `radial-gradient(ellipse 42% 38% at ${x * 100}% ${y * 100}%, ${color} 0%, transparent 68%)`
  );

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[45]"
      style={{
        background,
        opacity: intensity,
        mixBlendMode: "soft-light",
      }}
      aria-hidden
    />
  );
}
