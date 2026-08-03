"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/living-scene/use-reduced-motion";

/** Fine film grain — decorative only, hidden from AT */
export default function FilmGrain({ opacity = 0.35 }: { opacity?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[15]"
      aria-hidden
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        mixBlendMode: "soft-light",
      }}
      animate={{ opacity: [opacity * 0.85, opacity, opacity * 0.9, opacity] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
    />
  );
}
