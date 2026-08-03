"use client";

import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { studioConfig } from "@/lib/studioConfig";
import { releaseConfig } from "@/lib/releaseConfig";

/** Section 8 — studio statement */
export default function StudioStatement() {
  const { statement } = studioConfig;

  return (
    <section className="border-t border-dirty-white/10 bg-[#0A0A0A]">
      <div className="mx-auto grid max-w-[1600px] md:grid-cols-2">
        <ScrollReveal className="relative min-h-[50vh] overflow-hidden md:min-h-[65vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={releaseConfig.media.poster}
            alt=""
            className="h-full w-full object-cover grayscale-[0.4]"
          />
          <div className="absolute inset-0 bg-black/55" />
        </ScrollReveal>

        <ScrollReveal
          className="flex flex-col justify-center px-6 py-16 md:px-14 md:py-24"
          delay={0.1}
        >
          <p className="label-code text-faded">{statement.heading}</p>
          <div className="body-copy mt-8 space-y-4 text-dirty-white/55">
            {statement.body.map((line, i) =>
              line ? <p key={i}>{line}</p> : <br key={i} />
            )}
          </div>

          <ul className="mt-14 space-y-8 border-t border-dirty-white/10 pt-10">
            {statement.principles.map((p) => (
              <li key={p.num} className="grid grid-cols-[48px_1fr] gap-4">
                <span className="label-code text-dirty-white/30">{p.num}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#E8E6E1]">
                  {p.title}
                </span>
              </li>
            ))}
          </ul>

          <Link href="/studio/" className="btn-solid mt-14 w-fit focus-ring">
            ENTER THE STUDIO
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
