"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/context/audio-context";
import { Volume2, VolumeX } from "lucide-react";

export default function SplashScreen() {
  const { hasEnteredSite, enterSite, isMuted, toggleMute } = useAudio();

  if (hasEnteredSite) return null;

  return (
    <AnimatePresence>
      {!hasEnteredSite && (
        <motion.div
          key="splash-screen"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Simplified background - less blur for performance */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Static glow - no animation for faster load */}
            <div
              className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/15 blur-[80px] md:h-[600px] md:w-[600px] md:blur-[120px]"
            />
          </div>

          {/* Content - faster animations */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-2xl font-bold uppercase tracking-[0.5em] text-white md:text-4xl text-glow">
                Divergent
              </h1>
              <p className="mt-2 text-center text-[10px] uppercase tracking-[0.4em] text-white/50">
                Studios
              </p>
            </motion.div>

            {/* Enter Button */}
            <motion.button
              onClick={enterSite}
              className="group relative overflow-hidden rounded-full border border-white/20 bg-transparent px-12 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_30px_rgba(189,22,64,0.3)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Enter</span>
            </motion.button>

            {/* Audio toggle */}
            <motion.div
              className="mt-12 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <button
                onClick={toggleMute}
                className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/50 transition hover:border-white/30 hover:text-white/80"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    <span>Sound Off</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    <span>Sound On</span>
                  </>
                )}
              </button>
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                Click to {isMuted ? "enable" : "disable"} ambient audio
              </p>
            </motion.div>
          </motion.div>

          {/* Bottom credit */}
          <motion.p
            className="absolute bottom-8 text-[9px] uppercase tracking-[0.2em] text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            Built by Wilson Collective Group LLC
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
