"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/section-heading";

const timeline = [
  { code: "001", title: "NOVA", status: "LIVE" },
  { code: "002", title: "TBD", status: "COMING" },
];

export default function AboutPage() {
  return (
    <div className="section-spacing mx-auto max-w-4xl px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--accent)] mb-4">
          About
        </p>
        <h1 className="text-3xl font-bold uppercase tracking-[0.15em] text-white md:text-5xl text-glow">
          Divergent Studios
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
          Designed like art. Worn like identity.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-16 space-y-6 text-sm leading-relaxed text-white/70"
      >
        <p>
          Divergent Studios is a creative house that treats every garment as an
          exhibition piece. We blend streetwear and gallery culture into a single
          language—one that speaks through fabric, structure, and limited drops.
        </p>
        <p>
          Our mission is to challenge the pace of fashion by slowing it down. Every
          exhibition tells a story. Every piece is a numbered artifact. We don&apos;t
          follow seasons—we follow ideas.
        </p>
        <p>
          The studio was founded in 2026 with EXHIBITION 001: NOVA—a tribute to new
          beginnings. Since then, we&apos;ve committed to quality over quantity,
          permanence over trend, and meaning over noise.
        </p>
      </motion.section>

      {/* Timeline */}
      <section className="mt-24">
        <SectionHeading title="Timeline" subtitle="Our exhibition history" />

        <div className="space-y-6">
          {timeline.map((item, i) => (
            <motion.div
              key={item.code}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-6 surface-card rounded-xl p-5"
            >
              <span className="text-2xl font-bold text-[var(--accent)]">
                {item.code}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold uppercase tracking-wide text-white">
                  {item.title}
                </p>
              </div>
              <span
                className={`text-[10px] uppercase tracking-wide ${
                  item.status === "LIVE" ? "text-[var(--accent)]" : "text-white/40"
                }`}
              >
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
