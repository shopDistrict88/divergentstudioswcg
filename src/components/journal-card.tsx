"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import type { JournalPost } from "@/lib/data";

interface JournalCardProps {
  post: JournalPost;
  index?: number;
}

export default function JournalCard({ post, index = 0 }: JournalCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link
        href={`/journal/${post.slug}`}
        className="group block surface-card rounded-2xl p-5 transition hover:border-[var(--accent)]/40"
      >
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="subtle" className="text-[8px]">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm font-semibold uppercase tracking-wide text-white group-hover:text-glow transition">
          {post.title}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-white/50 line-clamp-2">
          {post.excerpt}
        </p>
        <p className="mt-4 text-[10px] uppercase tracking-wide text-white/30">
          {post.date} · {post.readingTime}
        </p>
      </Link>
    </motion.div>
  );
}
