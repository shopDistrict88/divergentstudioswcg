"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useJournal } from "@/context/journal-context";
import ScrollReveal from "@/components/shared/ScrollReveal";

type Props = { params: Promise<{ slug: string }> };

export default function RecordEntryPage({ params }: Props) {
  const { slug } = use(params);
  const { journalPosts, isLoading } = useJournal();

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-black pt-20">
        <p className="label-code text-faded">Loading…</p>
      </div>
    );
  }

  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="min-h-screen bg-black px-6 pb-24 pt-20">
      <div className="mx-auto max-w-[640px]">
        <ScrollReveal>
          <Link href="/record/" className="label-code text-faded focus-ring">
            ← Journal
          </Link>
          <p className="label-code mt-12 text-faded">{post.date}</p>
          <h1 className="journal-entry mt-6 text-[18px] text-dirty-white/90">
            {post.title}
          </h1>
          <div className="journal-entry mt-10 whitespace-pre-wrap">
            {post.body}
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
}
