"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import type { Exhibition } from "@/lib/data";
import { Lock } from "lucide-react";

interface ArchiveCardProps {
  exhibition?: Exhibition;
  locked?: boolean;
  index?: number;
}

export default function ArchiveCard({ exhibition, locked = false, index = 0 }: ArchiveCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (locked) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        className="relative flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent blur-2xl" />
        <div className="relative z-10 text-center">
          <Lock className="mx-auto mb-3 h-5 w-5 text-white/30" />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Exhibition 002
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/30">
            Classified
          </p>
        </div>
      </motion.div>
    );
  }

  if (!exhibition) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link
        href={`/exhibitions/${exhibition.slug}`}
        className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a0b10] via-[#0d0d0d] to-[#0d0d0d] transition hover:border-[var(--accent)]/50"
      >
        {/* Status badge */}
        <div className="absolute right-4 top-4">
          <Badge
            variant={exhibition.status === "LIVE" ? "accent" : "default"}
            className="text-[9px]"
          >
            {exhibition.status}
          </Badge>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--accent)] mb-1">
            {exhibition.year}
          </p>
          <p className="text-lg font-semibold uppercase tracking-[0.15em] text-white group-hover:text-glow transition">
            {exhibition.title}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/50 line-clamp-2">
            {exhibition.meaning}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
