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
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Pulsing glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/10 blur-[120px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Secondary glow */}
            <motion.div
              className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-white/5 blur-[100px]"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Animated lines */}
            <svg
              className="absolute inset-0 h-full w-full opacity-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="var(--accent)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.line
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                stroke="var(--accent)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
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
              className="group relative overflow-hidden rounded-full border border-white/20 bg-transparent px-12 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-all duration-500 hover:border-[var(--accent)] hover:shadow-[0_0_40px_rgba(189,22,64,0.4)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Enter</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/20 to-[var(--accent)]/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>

            {/* Audio toggle */}
            <motion.div
              className="mt-12 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
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
            transition={{ duration: 0.6, delay: 2 }}
          >
            Built by Wilson Collective Group LLC
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
