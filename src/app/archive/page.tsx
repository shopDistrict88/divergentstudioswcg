"use client";

import { useState } from "react";
import Link from "next/link";
import { archiveEntries, ARCHIVE_FILTERS } from "@/data/archive";
import { archiveItems } from "@/data/archiveItems";
import { productImageTones } from "@/lib/data";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ArchiveLightbox from "@/components/archive/ArchiveLightbox";
import type { ArchiveItem } from "@/data/archiveItems";

export default function ArchivePage() {
  const [selected, setSelected] = useState<ArchiveItem | null>(null);
  const [filter, setFilter] = useState("ALL FILES");

  return (
    <div className="min-h-screen bg-[#050505] pb-24 pt-20">
      <div className="mx-auto max-w-[1600px] px-6">
        <ScrollReveal>
          <p className="label-code text-faded">Permanent Record</p>
          <h1 className="heading-display-stacked mt-4 text-[#E8E6E1]">
            THE
            <br />
            ARCHIVE
          </h1>
          <p className="label-code mt-8 max-w-lg text-dirty-white/35">
            A PERMANENT RECORD OF RELEASED, REJECTED, UNFINISHED, AND RETIRED
            WORK.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <div className="flex flex-wrap gap-5 border-b border-dirty-white/10 pb-8">
            {ARCHIVE_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`label-code transition focus-ring ${
                  filter === f
                    ? "text-[#E8E6E1]"
                    : "text-faded hover:text-dirty-white/70"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16">
          <p className="label-code text-faded">COLLECTION FILES</p>
          <ul className="mt-8">
            {archiveEntries.map((e) => (
              <li key={e.id}>
                {e.href ? (
                  <Link
                    href={e.href}
                    className="block border-b border-dirty-white/10 py-8 transition hover:bg-dirty-white/[0.02] focus-ring"
                  >
                    <div className="grid gap-4 md:grid-cols-[100px_1fr_auto_auto] md:items-baseline">
                      <span className="font-code text-lg tracking-[0.12em] text-[#E8E6E1]/85">
                        {e.id}
                      </span>
                      <div>
                        <span className="text-[13px] uppercase tracking-[0.14em] text-dirty-white/75">
                          {e.code}
                        </span>
                        {e.type && (
                          <p className="label-code mt-1 text-dirty-white/30">
                            TYPE: {e.type}
                          </p>
                        )}
                      </div>
                      <span className="label-code text-faded">
                        {e.developed || e.year}
                      </span>
                      <span className="label-code text-right text-faded">
                        {e.status}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="grid gap-4 border-b border-dirty-white/10 py-8 md:grid-cols-[100px_1fr_auto_auto] md:items-baseline opacity-50">
                    <span className="font-code text-lg tracking-[0.12em] text-dirty-white/85">
                      {e.id}
                    </span>
                    <span className="text-[13px] uppercase tracking-[0.14em] text-dirty-white/75">
                      {e.code}
                    </span>
                    <span className="label-code text-faded">{e.year}</span>
                    <span className="label-code text-right text-faded">
                      {e.status}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal className="mt-24">
          <p className="label-code text-faded">ARTIFACTS</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {archiveItems.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.04}>
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="group w-full text-left focus-ring"
                >
                  <div
                    className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${productImageTones[item.tone || "slate"]}`}
                  >
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="media-pending absolute inset-0 flex-col gap-2">
                        <span>{item.category}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />
                  </div>
                  <p className="label-code mt-4 text-faded">{item.category}</p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-dirty-white/80">
                    {item.title}
                  </p>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <ArchiveLightbox item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
