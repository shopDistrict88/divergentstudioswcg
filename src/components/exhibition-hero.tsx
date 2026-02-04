"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Exhibition } from "@/lib/data";

interface ExhibitionHeroProps {
  exhibition: Exhibition;
}

export default function ExhibitionHero({ exhibition }: ExhibitionHeroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-3xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--accent)] mb-4"
        >
          {exhibition.year}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-bold uppercase tracking-[0.15em] text-white md:text-6xl text-glow"
        >
          Exhibition 001
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-2 text-6xl font-bold uppercase tracking-[0.2em] text-[var(--accent)] md:text-8xl"
        >
          NOVA
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60"
        >
          {exhibition.meaning}
        </motion.p>
      </div>
    </section>
  );
}
