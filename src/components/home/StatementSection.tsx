"use client";

import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ParallaxMedia from "@/components/shared/ParallaxMedia";
import { releaseConfig } from "@/lib/releaseConfig";
import TextureOverlay from "@/components/shared/TextureOverlay";

/** Section two — split statement + campaign image */
export default function StatementSection() {
  return (
    <section className="border-t border-dirty-white/10 bg-[#0f0f0f]">
      <div className="mx-auto grid max-w-[1600px] md:grid-cols-2">
        <ScrollReveal className="relative min-h-[55vh] overflow-hidden md:min-h-[75vh]">
          <ParallaxMedia className="h-full hover-zoom" intensity={10}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={releaseConfig.media.poster}
              alt=""
              className="h-full min-h-[55vh] w-full object-cover object-[40%_center] md:min-h-[75vh]"
            />
          </ParallaxMedia>
          <TextureOverlay />
        </ScrollReveal>

        <ScrollReveal
          className="flex flex-col justify-center px-6 py-16 md:px-14 md:py-24"
          delay={0.15}
        >
          <h2 className="heading-display-stacked text-dirty-white">
            We don&apos;t
            <br />
            chase trends.
          </h2>
          <p className="heading-display-stacked mt-2 text-dirty-white/35">
            We engineer
            <br />
            garments.
          </p>
          <p className="body-copy mt-10">
            Every piece is developed with obsessive attention to weight, wash,
            construction, and longevity. Nothing is rushed. Nothing is
            accidental.
          </p>
          <Link href="/shop/" className="btn-ghost mt-12 w-fit focus-ring">
            View Collection
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
