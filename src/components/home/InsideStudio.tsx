"use client";

import { useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { studioConfig } from "@/lib/studioConfig";
import { releaseConfig } from "@/lib/releaseConfig";

/** Section 5 — inside the studio process explorer */
export default function InsideStudio() {
  const categories = studioConfig.insideStudio.categories;
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <section className="border-t border-dirty-white/10 bg-[#050505] section-cinematic">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-6 md:py-24">
        <ScrollReveal>
          <p className="label-code text-faded">INSIDE THE STUDIO</p>
          <p className="label-code mt-3 text-dirty-white/35">
            PROCESS, MATERIAL, REVISION, AND CONSTRUCTION.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[280px_1fr]">
          <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(i)}
                className={`shrink-0 border px-4 py-3 text-left label-code transition focus-ring lg:w-full ${
                  active === i
                    ? "border-dirty-white/30 bg-dirty-white/[0.04] text-dirty-white"
                    : "border-dirty-white/10 text-faded hover:border-dirty-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          <ScrollReveal className="grid gap-8 md:grid-cols-2" key={current.id}>
            <div className="relative min-h-[280px] overflow-hidden border border-dirty-white/10 bg-[#111111]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={releaseConfig.media.poster}
                alt=""
                className="h-full w-full object-cover opacity-60 grayscale-[0.35]"
              />
              <div className="absolute inset-0 bg-black/40" />
              <p className="label-code absolute bottom-4 left-4 text-dirty-white/40">
                PLACEHOLDER — REPLACE WITH PROCESS IMAGE
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="heading-object text-[#E8E6E1]">{current.headline}</h3>
              <ul className="mt-8 space-y-3">
                {current.details.map((line) => (
                  <li key={line} className="label-code text-dirty-white/45">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
