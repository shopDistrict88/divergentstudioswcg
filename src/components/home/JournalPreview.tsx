"use client";

import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { studioConfig } from "@/lib/studioConfig";

/** Section 6 — journal preview */
export default function JournalPreview() {
  const entries = studioConfig.journalPreview;

  return (
    <section className="border-t border-dirty-white/10 bg-[#0A0A0A] section-cinematic">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-6 md:py-24">
        <ScrollReveal>
          <p className="label-code text-faded">STUDIO JOURNAL</p>
          <p className="label-code mt-3 max-w-lg text-dirty-white/35">
            IDEAS, DEVELOPMENT, TESTS, FAILURES, AND UNFINISHED WORK.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 md:grid-cols-12">
          {entries.map((entry, i) => {
            const layouts = [
              "md:col-span-7 md:row-span-2",
              "md:col-span-5",
              "md:col-span-4",
              "md:col-span-8",
            ];
            const isRestricted = entry.layout === "restricted";

            return (
              <ScrollReveal key={entry.entryNumber} delay={i * 0.06}>
                <Link
                  href={`/journal/${entry.slug}/`}
                  className={`group block h-full border border-dirty-white/10 bg-[#111111] p-6 transition hover:border-dirty-white/20 focus-ring ${layouts[i] ?? ""}`}
                >
                  <p className="label-code text-dirty-white/35">
                    JOURNAL {entry.entryNumber}
                  </p>
                  <h3
                    className={`mt-4 text-[13px] uppercase tracking-[0.16em] text-[#E8E6E1] ${
                      isRestricted ? "blur-[2px] select-none" : ""
                    }`}
                  >
                    {entry.title}
                  </h3>
                  <p className="label-code mt-6 text-faded">{entry.date}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {entry.status && (
                      <span className="label-code text-dirty-white/45">
                        STATUS: {entry.status}
                      </span>
                    )}
                    <span className="label-code text-dirty-white/30">
                      {entry.accessLevel}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-12">
          <Link href="/journal/" className="btn-ghost focus-ring">
            OPEN THE JOURNAL
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
