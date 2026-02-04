"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const panels = [
  { id: 1, tone: "from-[#1a0b10] via-[#2a0f18] to-[#bd1640]" },
  { id: 2, tone: "from-[#0a0b10] via-[#12141f] to-[#1b1d2a]" },
  { id: 3, tone: "from-[#0c0b0b] via-[#1a0f0f] to-[#402122]" },
  { id: 4, tone: "from-[#1a1a1a] via-[#222] to-[#2b2b2b]" },
  { id: 5, tone: "from-[#1a0b10] via-[#2a0f18] to-[#bd1640]" },
  { id: 6, tone: "from-[#0a0b10] via-[#12141f] to-[#1b1d2a]" },
];

export default function LookbookScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-24">
      <p className="mb-10 px-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40 md:px-8">
        Lookbook
      </p>

      <motion.div
        style={{ x }}
        className="flex gap-4 pl-4 md:gap-6 md:pl-8"
      >
        {panels.map((panel) => (
          <div
            key={panel.id}
            className={`aspect-[3/4] w-60 flex-shrink-0 rounded-2xl bg-gradient-to-br ${panel.tone} md:w-72`}
          />
        ))}
      </motion.div>
    </section>
  );
}
