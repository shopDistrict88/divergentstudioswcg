"use client";

import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { studioConfig } from "@/lib/studioConfig";
import { releaseConfig } from "@/lib/releaseConfig";

/** Section 7 — archive preview */
export default function ArchivePreview() {
  const file = studioConfig.archivePreview;

  return (
    <section className="border-t border-dirty-white/10 bg-[#050505] section-cinematic">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-6 md:py-24">
        <ScrollReveal>
          <p className="label-code text-faded">THE ARCHIVE</p>
          <p className="label-code mt-3 text-dirty-white/35">
            PAST EXHIBITIONS, RETIRED PIECES, PROTOTYPES, AND UNRELEASED WORK.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-14" delay={0.1}>
          <Link
            href={file.href}
            className="group grid overflow-hidden border border-dirty-white/10 bg-[#111111] md:grid-cols-2 focus-ring"
          >
            <div className="relative min-h-[240px] md:min-h-[360px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={releaseConfig.media.poster}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/35" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="label-code text-dirty-white/35">
                ARCHIVE FILE {file.archiveNumber}
              </p>
              <h3 className="heading-display-stacked mt-4 text-[#E8E6E1]">
                {file.name}
              </h3>
              <dl className="mt-10 space-y-3">
                <div className="flex gap-4">
                  <dt className="label-code w-28 text-faded">DEVELOPED</dt>
                  <dd className="label-code text-dirty-white/60">{file.developed}</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="label-code w-28 text-faded">RELEASED</dt>
                  <dd className="label-code text-dirty-white/60">{file.released}</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="label-code w-28 text-faded">PIECES</dt>
                  <dd className="label-code text-dirty-white/60">
                    {String(file.releasedPieces).padStart(2, "0")} RELEASED ·{" "}
                    {file.prototypes} PROTOTYPES · {file.developmentFiles} FILES
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="label-code w-28 text-faded">STATUS</dt>
                  <dd className="label-code text-dirty-white/60">{file.status}</dd>
                </div>
              </dl>
              <span className="link-nav mt-10">ENTER THE ARCHIVE</span>
            </div>
          </Link>
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <Link href="/archive/" className="link-nav focus-ring">
            All Archive Files
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
