"use client";

import Link from "next/link";
import { releaseConfig } from "@/lib/releaseConfig";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ParallaxMedia from "@/components/shared/ParallaxMedia";
import TextureOverlay from "@/components/shared/TextureOverlay";

const EXHIBITION = [
  { span: "col-span-12", aspect: "aspect-[21/9]", offset: "", crop: "object-center" },
  { span: "col-span-12 md:col-span-7", aspect: "aspect-[3/4]", offset: "", crop: "object-[35%_20%]" },
  { span: "col-span-12 md:col-span-5 md:col-start-9", aspect: "aspect-[4/5]", offset: "md:-mt-24", crop: "object-[70%_40%]" },
  { span: "col-span-12 md:col-span-8", aspect: "aspect-[16/10]", offset: "md:mt-8", crop: "object-[50%_60%]" },
  { span: "col-span-12 md:col-span-4 md:col-start-10", aspect: "aspect-[3/4]", offset: "md:-mt-32", crop: "object-center grayscale" },
  { span: "col-span-12", aspect: "aspect-[2/1]", offset: "md:mt-4", crop: "object-[30%_center]" },
] as const;

export default function CampaignPage() {
  return (
    <div className="bg-black pt-14 md:pt-16">
      <section className="relative min-h-[90vh] overflow-hidden">
        <ParallaxMedia className="absolute inset-0 hover-zoom" intensity={6}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={releaseConfig.media.poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </ParallaxMedia>
        <TextureOverlay />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-[1600px] flex-col justify-end px-6 pb-16">
          <ScrollReveal>
            <p className="label-code text-faded">Campaign</p>
            <h1 className="heading-display-stacked mt-4 text-dirty-white">
              {releaseConfig.code}
            </h1>
            <p className="label-code mt-6 text-faded">
              Documented {releaseConfig.documented}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-20 md:py-28">
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          {EXHIBITION.map((frame, i) => (
            <ScrollReveal
              key={i}
              className={`relative overflow-hidden ${frame.span} ${frame.offset}`}
              delay={i * 0.05}
            >
              <div className={`relative ${frame.aspect} overflow-hidden bg-[#0f0f0f]`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={releaseConfig.media.poster}
                  alt=""
                  className={`h-full w-full object-cover transition duration-700 hover:scale-[1.02] ${frame.crop}`}
                  loading="lazy"
                />
              </div>
              <span className="label-code absolute bottom-3 left-3 text-faded">
                {String(i + 1).padStart(2, "0")}
              </span>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-20">
          <Link href="/shop/" className="btn-ghost inline-flex focus-ring">
            View Collection
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
