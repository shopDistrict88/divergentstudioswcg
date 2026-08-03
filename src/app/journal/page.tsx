"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useJournal } from "@/context/journal-context";

const CATEGORIES = [
  "All",
  "Campaign",
  "Process",
  "Subjects",
  "Materials",
  "Studio Notes",
  "Film",
  "Behind the Exhibition",
] as const;

export default function JournalPage() {
  const { journalPosts } = useJournal();
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (category === "All") return journalPosts;
    return journalPosts.filter((p) =>
      p.tags?.some((t) =>
        t.toLowerCase().includes(category.toLowerCase().split(" ")[0])
      )
    );
  }, [journalPosts, category]);

  const [featured, ...rest] = filtered.length ? filtered : journalPosts;

  return (
    <div className="min-h-screen bg-[#050505] px-6 pb-32 pt-28 md:px-16">
      <p className="label-caps">Editorial</p>
      <h1 className="font-display mt-4 text-4xl tracking-[0.12em] text-white/90 md:text-5xl">
        Journal
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/40">
        Campaign films, design notes, manufacturing footage, and studio ritual.
      </p>

      <div className="mt-10 flex flex-wrap gap-5">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`text-[10px] uppercase tracking-[0.3em] transition focus-ring ${
              category === c ? "text-white" : "text-white/35 hover:text-white/70"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {featured && (
        <Link
          href={`/journal/${featured.slug}/`}
          className="group mt-16 grid gap-8 border-t border-white/10 pt-12 focus-ring md:grid-cols-2"
        >
          <div className="aspect-[16/10] bg-gradient-to-br from-[#16161a] to-[#080808] transition group-hover:brightness-110" />
          <div className="flex flex-col justify-end">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
              {featured.date} · {featured.readingTime}
            </p>
            <h2 className="font-display mt-4 text-3xl tracking-[0.06em] text-white/90 group-hover:text-white">
              {featured.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              {featured.excerpt}
            </p>
          </div>
        </Link>
      )}

      <div className="mt-6 grid gap-x-10 gap-y-14 border-t border-white/10 pt-14 md:grid-cols-2">
        {rest.map((post, i) => (
          <Link
            key={post.id}
            href={`/journal/${post.slug}/`}
            className={`group block focus-ring ${i % 3 === 0 ? "md:mt-12" : ""}`}
          >
            <div className="aspect-[16/11] bg-[#0c0c0e] transition group-hover:brightness-110">
              <div className="h-full bg-gradient-to-br from-[#121214] to-[#080808]" />
            </div>
            <p className="mt-4 text-[9px] uppercase tracking-[0.3em] text-white/30">
              {post.tags?.[0] ?? "Studio Notes"} · {post.date}
            </p>
            <h3 className="font-display mt-2 text-xl text-white/85 group-hover:text-white">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-white/40 line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>

      {journalPosts.length === 0 && (
        <p className="label-caps mt-20 text-center">No journal entries yet.</p>
      )}
    </div>
  );
}
