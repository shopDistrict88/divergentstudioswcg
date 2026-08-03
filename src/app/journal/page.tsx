"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useJournal } from "@/context/journal-context";
import { studioConfig } from "@/lib/studioConfig";

const FILTERS = [
  "ALL ENTRIES",
  "IDEAS",
  "SKETCHES",
  "DEVELOPMENT",
  "SAMPLES",
  "MATERIALS",
  "MOCKUPS",
  "NOTES",
  "REJECTED",
  "RESTRICTED",
] as const;

function accessLabel(level: string) {
  if (/restricted/i.test(level)) return "RESTRICTED";
  if (/partial/i.test(level)) return "PARTIAL";
  return "PUBLIC";
}

export default function JournalPage() {
  const { journalPosts } = useJournal();
  const [filter, setFilter] = useState<string>("ALL ENTRIES");

  const previewEntries = studioConfig.journalPreview;

  const filtered = useMemo(() => {
    if (filter === "ALL ENTRIES") return journalPosts;
    const key = filter.toLowerCase().split(" ")[0];
    return journalPosts.filter((p) =>
      p.tags?.some((t) => t.toLowerCase().includes(key))
    );
  }, [journalPosts, filter]);

  const [featured, ...rest] = filtered.length ? filtered : journalPosts;

  return (
    <div className="min-h-screen bg-[#050505] px-6 pb-32 pt-28 md:px-16">
      <p className="label-code text-faded">Internal Notes</p>
      <h1 className="heading-display-stacked mt-4 text-[#E8E6E1]">
        STUDIO
        <br />
        JOURNAL
      </h1>
      <p className="label-code mt-6 max-w-md text-dirty-white/35">
        PUBLIC NOTES FROM AN ACTIVE STUDIO. NOT EVERYTHING SHOWN HERE WILL BE
        RELEASED.
      </p>

      <div className="mt-10 flex flex-wrap gap-5">
        {FILTERS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`label-code transition focus-ring ${
              filter === c ? "text-[#E8E6E1]" : "text-faded hover:text-dirty-white/70"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Preview entries from studioConfig — irregular layouts */}
      <div className="mt-16 grid gap-6 md:grid-cols-12">
        {previewEntries.map((entry, i) => {
          const layouts = [
            "md:col-span-7 md:row-span-2",
            "md:col-span-5",
            "md:col-span-5 md:col-start-8",
            "md:col-span-4",
          ];
          const isRestricted = entry.layout === "restricted";
          const isNote = entry.layout === "note";

          return (
            <Link
              key={entry.slug}
              href={`/journal/${entry.slug}/`}
              className={`group block border border-dirty-white/10 bg-[#111111] p-6 focus-ring ${layouts[i % layouts.length]}`}
            >
              <p className="label-code text-dirty-white/35">
                JOURNAL {entry.entryNumber}
              </p>
              {isNote ? (
                <p className="mt-6 font-code text-[15px] leading-relaxed text-[#E8E6E1]/80">
                  {entry.title}
                </p>
              ) : (
                <>
                  {!isRestricted && (
                    <div className="mt-6 aspect-[16/10] bg-[#0A0A0A]" />
                  )}
                  {isRestricted && (
                    <div className="mt-6 aspect-[16/10] bg-[#0A0A0A] blur-sm" />
                  )}
                  <h2 className="heading-object mt-6 text-dirty-white/85 group-hover:text-[#E8E6E1]">
                    {entry.title}
                  </h2>
                </>
              )}
              <div className="mt-4 flex flex-wrap gap-4">
                <span className="label-code text-dirty-white/30">{entry.date}</span>
                <span className="label-code text-dirty-white/30">
                  {entry.category}
                </span>
                <span className="label-code text-dirty-white/30">
                  ACCESS: {accessLabel(entry.accessLevel)}
                </span>
                {entry.status && (
                  <span className="label-code text-dirty-white/30">
                    STATUS: {entry.status}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {featured && (
        <Link
          href={`/journal/${featured.slug}/`}
          className="group mt-20 grid gap-8 border-t border-dirty-white/10 pt-12 focus-ring md:grid-cols-2"
        >
          <div className="aspect-[16/10] bg-[#111111]" />
          <div className="flex flex-col justify-end">
            <p className="label-code text-dirty-white/35">
              {featured.date} · {featured.readingTime}
            </p>
            <h2 className="heading-section mt-4 text-[#E8E6E1] group-hover:text-dirty-white">
              {featured.title}
            </h2>
            <p className="mt-4 body-copy">{featured.excerpt}</p>
          </div>
        </Link>
      )}

      <div className="mt-6 grid gap-x-10 gap-y-14 border-t border-dirty-white/10 pt-14 md:grid-cols-2">
        {rest.map((post, i) => (
          <Link
            key={post.id}
            href={`/journal/${post.slug}/`}
            className={`group block focus-ring ${i % 3 === 0 ? "md:mt-12" : ""}`}
          >
            <div className="aspect-[16/11] bg-[#111111] transition group-hover:brightness-110" />
            <p className="mt-4 label-code text-dirty-white/30">
              {post.tags?.[0] ?? "NOTES"} · {post.date}
            </p>
            <h3 className="heading-object mt-2 text-dirty-white/85 group-hover:text-[#E8E6E1]">
              {post.title}
            </h3>
            <p className="mt-2 body-copy line-clamp-2">{post.excerpt}</p>
          </Link>
        ))}
      </div>

      {journalPosts.length === 0 && previewEntries.length === 0 && (
        <p className="label-code mt-20 text-center text-faded">
          No journal entries yet.
        </p>
      )}
    </div>
  );
}
