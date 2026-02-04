"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { journalPosts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="section-spacing mx-auto max-w-2xl px-4 md:px-8">
      <Link
        href="/journal"
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Journal
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="subtle">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-2xl font-bold uppercase tracking-[0.1em] text-white md:text-3xl text-glow">
          {post.title}
        </h1>

        <p className="mt-4 text-xs uppercase tracking-wide text-white/40">
          {post.date} · {post.readingTime}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 space-y-6 text-sm leading-relaxed text-white/70"
      >
        {post.body.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </motion.div>
    </article>
  );
}
