"use client";

import { motion } from "framer-motion";
import { entranceConfig } from "@/lib/entranceConfig";
import { useReducedMotion } from "@/components/living-scene/use-reduced-motion";

/**
 * Restrained film texture for the loading screen.
 * Decorative only — hidden from assistive technology.
 */
export default function FilmTexture({
  intensity = entranceConfig.filmGrainIntensity,
}: {
  intensity?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
      {/* Soft vignette */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 48%, transparent 42%, rgba(0,0,0,0.55) 100%)",
        }}
        animate={{ opacity: [0.85, 1, 0.9, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Fine grain */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: intensity,
          mixBlendMode: "soft-light",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
        animate={{
          opacity: [
            intensity * 0.85,
            intensity,
            intensity * 0.92,
            intensity,
          ],
        }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />

      {/* Barely visible luminance breathe */}
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{ opacity: [0, 0.012, 0.004, 0.01, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
