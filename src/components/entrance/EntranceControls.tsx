"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type EntranceControlsProps = {
  showSkip: boolean;
  showSound: boolean;
  soundOn: boolean;
  onSkip: () => void;
  onToggleSound: () => void;
  progress: number;
  progressEnabled: boolean;
};

export default function EntranceControls({
  showSkip,
  showSound,
  soundOn,
  onSkip,
  onToggleSound,
  progress,
  progressEnabled,
}: EntranceControlsProps) {
  return (
    <>
      <AnimatePresence>
        {showSound && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onToggleSound}
            className="absolute bottom-safe left-safe z-40 flex h-10 w-10 items-center justify-center text-white/40 transition hover:text-white/80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/50 md:bottom-8 md:left-8"
            aria-label={soundOn ? "Mute entrance sound" : "Enable entrance sound"}
            aria-pressed={soundOn}
          >
            {soundOn ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSkip && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            whileHover={{ opacity: 0.9 }}
            transition={{ duration: 0.5 }}
            onClick={onSkip}
            className="absolute bottom-safe right-safe z-40 text-[9px] uppercase tracking-[0.35em] text-white transition focus-visible:opacity-90 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/50 md:bottom-8 md:right-8"
            aria-label="Skip intro"
          >
            Skip
          </motion.button>
        )}
      </AnimatePresence>

      {progressEnabled && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-px opacity-[0.18]"
          aria-hidden
        >
          <div
            className="h-full bg-white/50 transition-[width] duration-150 ease-linear"
            style={{ width: `${Math.min(100, progress * 100)}%` }}
          />
        </div>
      )}
    </>
  );
}
