"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { JournalPost } from "@/lib/data";

interface JournalPostContentProps {
  post: JournalPost;
}

export default function JournalPostContent({ post }: JournalPostContentProps) {
  return (
    <article className="mx-auto max-w-2xl px-6 pb-32 pt-28 md:px-8">
      <Link
        href="/journal/"
        className="mb-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 transition hover:text-white focus-ring"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Journal
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] uppercase tracking-[0.3em] text-white/35"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-display text-3xl tracking-[0.08em] text-white/95 md:text-4xl">
          {post.title}
        </h1>

        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/35">
          {post.date} · {post.readingTime}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-14 space-y-6 text-sm leading-[1.9] text-white/60"
      >
        {post.body.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </motion.div>
    </article>
  );
}
