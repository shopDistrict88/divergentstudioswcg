"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SECTIONS = [
  {
    id: "Divergence",
    body: "We leave the expected path. Fashion as art. Commerce as exhibition.",
  },
  {
    id: "Exhibition",
    body: "Every collection is a chapter with a thesis, a mood, and a finite run.",
  },
  {
    id: "Artifact",
    body: "Garments are not inventory. They are objects with provenance.",
  },
  {
    id: "Subject",
    body: "Wearers enter the story. Campaign participants become part of the archive.",
  },
  {
    id: "Process",
    body: "Design, manufacturing, photography, and packaging are documented as ritual.",
  },
  {
    id: "Permanence",
    body: "No restocks. No noise. What leaves the studio stays scarce on purpose.",
  },
];

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-[#050505] px-6 pb-32 pt-28 md:px-16">
      <p className="label-caps">Philosophy</p>
      <h1 className="font-display mt-4 max-w-xl text-4xl tracking-[0.1em] text-white/90 md:text-5xl">
        The meaning behind Divergent Studios
      </h1>

      <div className="mx-auto mt-24 max-w-2xl space-y-10 text-center">
        {[
          "We do not make clothing.",
          "We build exhibitions.",
          "Every collection is an idea.",
          "Every garment is an artifact.",
          "Every person becomes part of the story.",
        ].map((line, i) => (
          <motion.p
            key={line}
            className="font-display text-2xl tracking-[0.06em] text-white/80 md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <div className="mx-auto mt-32 max-w-3xl space-y-0 border-t border-white/10">
        {SECTIONS.map((s) => (
          <div
            key={s.id}
            className="grid gap-4 border-b border-white/10 py-10 md:grid-cols-[200px_1fr]"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
              {s.id}
            </p>
            <p className="text-sm leading-[1.9] text-white/55">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <Link href="/exhibition/" className="btn-primary focus-ring">
          Enter Exhibition 001
        </Link>
      </div>
    </div>
  );
}
