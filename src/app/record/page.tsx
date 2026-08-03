"use client";

import Link from "next/link";
import { useJournal } from "@/context/journal-context";
import ScrollReveal from "@/components/shared/ScrollReveal";

const FALLBACK_ENTRIES = [
  {
    id: "1",
    slug: "started-over",
    date: "March 18",
    title: "Started over.",
    excerpt: "The hoodie wasn't heavy enough.",
    body: "The hoodie wasn't heavy enough.\n\nWe scrapped the first run entirely. 450 GSM wasn't going to cut it. Started again at 650.",
  },
  {
    id: "2",
    slug: "right-wash",
    date: "May 4",
    title: "Finally found the right wash.",
    excerpt: "Third factory. Fourth formula.",
    body: "Third factory. Fourth formula.\n\nThe wash finally looked right. Not too distressed. Not too clean. Exactly what we wanted.",
  },
  {
    id: "3",
    slug: "embroidery-right",
    date: "June 8",
    title: "The embroidery finally looked right.",
    excerpt: "Thread density iteration 07.",
    body: "Thread density iteration 07.\n\nBack mark approved. Front mark rejected again. We'll get there.",
  },
];

export default function RecordPage() {
  const { journalPosts } = useJournal();
  const entries =
    journalPosts.length > 0
      ? journalPosts.map((p) => ({
          id: p.id,
          slug: p.slug,
          date: p.date,
          title: p.title,
          excerpt: p.excerpt,
        }))
      : FALLBACK_ENTRIES;

  return (
    <div className="min-h-screen bg-black pb-24 pt-20">
      <div className="mx-auto max-w-[720px] px-6">
        <ScrollReveal>
          <p className="label-code text-faded">Journal</p>
          <h1 className="heading-display-stacked mt-4 text-dirty-white">
            Studio
            <br />
            Record
          </h1>
        </ScrollReveal>

        <div className="mt-20 space-y-0">
          {entries.map((entry, i) => (
            <ScrollReveal key={entry.id} delay={i * 0.08}>
              <article className="border-b border-dirty-white/10 py-12">
                <Link
                  href={`/record/${entry.slug}/`}
                  className="group block focus-ring"
                >
                  <p className="label-code text-faded">{entry.date}</p>
                  <p className="journal-entry mt-6 text-[15px] text-dirty-white/80 transition group-hover:text-dirty-white">
                    {entry.title}
                  </p>
                  <p className="journal-entry mt-3 text-faded">
                    {entry.excerpt}
                  </p>
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
