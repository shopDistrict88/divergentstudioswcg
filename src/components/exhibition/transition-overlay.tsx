"use client";

import { motion } from "framer-motion";

type TransitionOverlayProps = {
  active: boolean;
};

export default function TransitionOverlay({ active }: TransitionOverlayProps) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[200] bg-black"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
      aria-hidden
    />
  );
}
