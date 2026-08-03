"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";
import { releaseConfig } from "@/lib/releaseConfig";

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-black pb-24 pt-20">
      <div className="mx-auto max-w-[1600px] px-6">
        <div className="grid gap-16 md:grid-cols-2 md:gap-8">
          <ScrollReveal className="relative min-h-[50vh] overflow-hidden md:min-h-[70vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={releaseConfig.media.poster}
              alt=""
              className="h-full min-h-[50vh] w-full object-cover object-center md:min-h-[70vh]"
            />
            <div className="absolute inset-0 bg-black/25" aria-hidden />
          </ScrollReveal>

          <ScrollReveal className="flex flex-col justify-center md:py-16" delay={0.15}>
            <p className="label-code text-faded">About</p>
            <h1 className="heading-display-stacked mt-6 text-dirty-white">
              Divergent
              <br />
              Studios
            </h1>
            <p className="body-copy mt-10">
              Divergent Studios exists to build garments with intention.
            </p>
            <p className="body-copy mt-4">
              Nothing is rushed. Nothing is accidental. Every detail matters.
            </p>
            <dl className="mt-14 space-y-4 border-t border-dirty-white/10 pt-10">
              <div className="flex gap-6">
                <dt className="label-code w-20 text-faded">Est.</dt>
                <dd className="text-[12px] uppercase tracking-[0.14em] text-dirty-white/65">
                  2025
                </dd>
              </div>
              <div className="flex gap-6">
                <dt className="label-code w-20 text-faded">Focus</dt>
                <dd className="text-[12px] uppercase tracking-[0.14em] text-dirty-white/65">
                  Garments / Image / Object
                </dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
