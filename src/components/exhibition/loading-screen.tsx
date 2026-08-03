"use client";

import { motion } from "framer-motion";

type LoadingScreenProps = {
  progress: number;
  visible: boolean;
};

export default function LoadingScreen({
  progress,
  visible,
}: LoadingScreenProps) {
  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
      aria-busy
      aria-label="Initializing exhibition"
    >
      <div className="film-grain !absolute opacity-30" aria-hidden />
      <p className="font-display text-lg tracking-[0.35em] text-white/90 md:text-xl">
        Divergent Studios
      </p>
      <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-white/35">
        Initializing Exhibition
      </p>
      <div className="mt-12 h-px w-40 overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-white/50"
          style={{ width: `${Math.min(100, Math.round(progress))}%` }}
        />
      </div>
      <p className="mt-3 font-mono text-[9px] tracking-[0.2em] text-white/25">
        {Math.min(100, Math.round(progress))}%
      </p>
    </motion.div>
  );
}
