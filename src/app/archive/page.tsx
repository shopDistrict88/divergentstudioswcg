"use client";

import { useState } from "react";
import Link from "next/link";
import { archiveEntries } from "@/data/archive";
import { archiveItems } from "@/data/archiveItems";
import { productImageTones } from "@/lib/data";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ArchiveLightbox from "@/components/archive/ArchiveLightbox";
import type { ArchiveItem } from "@/data/archiveItems";

export default function ArchivePage() {
  const [selected, setSelected] = useState<ArchiveItem | null>(null);

  return (
    <div className="min-h-screen bg-black pb-24 pt-20">
      <div className="mx-auto max-w-[1600px] px-6">
        <ScrollReveal>
          <p className="label-code text-faded">Archive</p>
          <h1 className="heading-display-stacked mt-4 text-dirty-white">
            Behind
            <br />
            the work.
          </h1>
          <p className="body-copy mt-8">
            Concepts, prototypes, rejected graphics, factory tests, and
            handwritten notes. Exclusive access to the process.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-20">
          <p className="label-code text-faded">Releases</p>
          <ul className="mt-8">
            {archiveEntries.map((e) => (
              <li key={e.id}>
                {e.href ? (
                  <Link
                    href={e.href}
                    className="block border-b border-dirty-white/10 py-7 transition hover:bg-dirty-white/[0.02] focus-ring"
                  >
                    <div className="grid grid-cols-[72px_1fr_auto] items-baseline gap-4 md:grid-cols-[96px_1fr_120px_140px]">
                      <span className="font-code text-lg tracking-[0.12em] text-dirty-white/85">
                        {e.id}
                      </span>
                      <span className="text-[13px] uppercase tracking-[0.14em] text-dirty-white/75">
                        {e.code}
                      </span>
                      <span className="hidden label-code text-faded md:block">
                        {e.year}
                      </span>
                      <span className="label-code text-right text-faded">
                        {e.status}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="grid grid-cols-[72px_1fr_auto] items-baseline gap-4 border-b border-dirty-white/10 py-7 md:grid-cols-[96px_1fr_120px_140px]">
                    <span className="font-code text-lg tracking-[0.12em] text-dirty-white/85">
                      {e.id}
                    </span>
                    <span className="text-[13px] uppercase tracking-[0.14em] text-dirty-white/75">
                      {e.code}
                    </span>
                    <span className="hidden label-code text-faded md:block">
                      {e.year}
                    </span>
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
          <p className="label-code text-faded">Artifacts</p>
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
                  <p className="label-code mt-4 text-faded">
                    {item.category}
                  </p>
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
