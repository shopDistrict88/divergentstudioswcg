"use client";

import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ParallaxMedia from "@/components/shared/ParallaxMedia";
import { releaseConfig } from "@/lib/releaseConfig";
import { studioConfig } from "@/lib/studioConfig";
import TextureOverlay from "@/components/shared/TextureOverlay";

/** Section 4 — collection statement */
export default function CollectionStatement() {
  const { statement } = studioConfig.collection;

  return (
    <section className="border-t border-dirty-white/10 bg-[#0A0A0A]">
      <div className="mx-auto grid max-w-[1600px] md:grid-cols-2">
        <ScrollReveal className="relative min-h-[55vh] overflow-hidden md:min-h-[75vh]">
          <ParallaxMedia className="h-full hover-zoom" intensity={8}>
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
          delay={0.12}
        >
          <p className="label-code text-faded">{statement.exhibition}</p>
          <div className="body-copy mt-10 space-y-4 text-dirty-white/55">
            {statement.body.map((line, i) =>
              line ? <p key={i}>{line}</p> : <br key={i} />
            )}
          </div>
          <Link
            href={releaseConfig.path}
            className="btn-ghost mt-12 w-fit focus-ring"
          >
            READ THE COLLECTION FILE
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
