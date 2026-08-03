"use client";

import Link from "next/link";
import { releaseConfig } from "@/lib/releaseConfig";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ParallaxMedia from "@/components/shared/ParallaxMedia";
import TextureOverlay from "@/components/shared/TextureOverlay";

export default function CampaignFragment() {
  return (
    <section className="relative border-t border-dirty-white/10 bg-[#0f0f0f]">
      <ScrollReveal>
        <Link
          href="/campaign/"
          className="group relative block min-h-[60vh] overflow-hidden focus-ring md:min-h-[75vh]"
        >
          <ParallaxMedia className="h-full hover-zoom" intensity={8}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={releaseConfig.media.poster}
              alt=""
              className="h-full min-h-[60vh] w-full object-cover transition duration-700 group-hover:scale-[1.02] md:min-h-[75vh]"
            />
          </ParallaxMedia>
          <TextureOverlay />
          <div className="absolute inset-0 bg-black/30 transition duration-700 group-hover:bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="label-code text-faded">Campaign</p>
            <p className="heading-section mt-4 text-dirty-white">
              {releaseConfig.code}
            </p>
            <p className="link-nav mt-8 opacity-0 transition duration-500 group-hover:opacity-100">
              View Exhibition
            </p>
          </div>
        </Link>
      </ScrollReveal>
    </section>
  );
}
