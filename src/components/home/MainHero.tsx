"use client";

import Link from "next/link";
import { releaseConfig } from "@/lib/releaseConfig";
import { studioConfig } from "@/lib/studioConfig";
import TextureOverlay from "@/components/shared/TextureOverlay";

/** Section 1 — current collection hero after entrance */
export default function MainHero() {
  const meta = studioConfig.collection.heroMeta;

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050505]">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={releaseConfig.media.poster}
          alt=""
          className="hero-ken-burns h-full w-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-black/50" />
        <TextureOverlay />
      </div>

      <div className="relative z-[1] flex min-h-[100dvh] flex-col justify-end px-6 pb-24 pt-32 md:px-14 md:pb-32">
        <p className="label-code text-faded" data-hero-item>
          EXHIBITION {releaseConfig.id}
        </p>
        <h1
          className="heading-display mt-4 max-w-[12ch] text-[clamp(3rem,11vw,6.5rem)] leading-[0.88] text-[#E8E6E1]"
          data-hero-item
        >
          {releaseConfig.code}
        </h1>
        <p className="label-code mt-6 text-dirty-white/45" data-hero-item>
          THE CURRENT COLLECTION
        </p>
        <p className="label-code mt-2 text-dirty-white/70" data-hero-item>
          AVAILABLE NOW
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5" data-hero-item>
          <Link href={releaseConfig.path} className="btn-solid focus-ring">
            VIEW COLLECTION
          </Link>
          <Link href="/campaign/" className="btn-secondary focus-ring">
            VIEW CAMPAIGN
          </Link>
        </div>

        <div
          className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-dirty-white/10 pt-6"
          data-hero-item
        >
          <span className="label-code text-faded">{meta.pieces}</span>
          <span className="label-code text-faded">{meta.production}</span>
          <span className="label-code text-faded">{meta.shipping}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2" data-hero-item>
          <span className="label-code text-dirty-white/25">{meta.file}</span>
          <span className="label-code text-dirty-white/25">{meta.released}</span>
          <span className="label-code text-dirty-white/25">{meta.status}</span>
        </div>
      </div>
    </section>
  );
}
