"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type SoundToggleProps = {
  enabled: boolean;
  onToggle: () => void;
  visible?: boolean;
};

/** Standalone sound toggle (also embedded in EntranceControls). */
export default function SoundToggle({
  enabled,
  onToggle,
  visible = true,
}: SoundToggleProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !visible) return null;

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="text-[9px] uppercase tracking-[0.3em] text-white/40 transition hover:text-white/80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/50"
      aria-label={enabled ? "Mute entrance sound" : "Enable entrance sound"}
      aria-pressed={enabled}
    >
      {enabled ? "Sound on" : "Sound off"}
    </motion.button>
  );
}
