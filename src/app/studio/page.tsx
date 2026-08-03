"use client";

import Link from "next/link";
import { studioConfig } from "@/lib/studioConfig";
import { releaseConfig } from "@/lib/releaseConfig";
import ScrollReveal from "@/components/shared/ScrollReveal";
import TextureOverlay from "@/components/shared/TextureOverlay";

const VISION = [
  "Divergent exists because clothing should carry intention — not trend cycles.",
  "Every piece is developed slowly, sampled repeatedly, and released in limited runs.",
  "Process is documented. Past work is preserved. Future work is hinted, never promised.",
  "The studio treats garments as both product and permanent record.",
];

const FOUNDER = {
  name: "KJ Wilson",
  role: "Founder / Creative Director",
  location: studioConfig.location,
  bio: [
    "Divergent began as a refusal to release without purpose.",
    "Every collection is built from research, revision, and documented process.",
    "The studio operates independently — design, development, and release on its own terms.",
  ],
};

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-16 md:pt-20">
      {/* 01 — Introduction */}
      <section className="relative min-h-[60vh] overflow-hidden border-b border-dirty-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={releaseConfig.media.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <TextureOverlay />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-[1600px] flex-col justify-end px-4 pb-16 md:px-6">
          <p className="label-code text-faded">01 — INTRODUCTION</p>
          <h1 className="heading-display-stacked mt-4 max-w-2xl text-[#E8E6E1]">
            DIVERGENT
            <br />
            STUDIOS
          </h1>
          <p className="label-code mt-8 max-w-lg text-dirty-white/45">
            AN INDEPENDENT CLOTHING STUDIO BUILT AROUND INTENTIONAL DESIGN,
            LIMITED PRODUCTION, AND THE REFUSAL TO CREATE WITHOUT PURPOSE.
          </p>
        </div>
      </section>

      {/* 02 — Vision */}
      <ScrollReveal className="mx-auto max-w-[1600px] px-4 py-16 md:px-6 md:py-24">
        <p className="label-code text-faded">02 — VISION</p>
        <div className="mt-8 max-w-xl space-y-6">
          {VISION.map((line) => (
            <p key={line} className="body-copy text-dirty-white/55">
              {line}
            </p>
          ))}
        </div>
      </ScrollReveal>

      {/* 03 — Method */}
      <section className="border-t border-dirty-white/10 bg-[#0A0A0A] px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-[1600px]">
          <p className="label-code text-faded">03 — METHOD</p>
          <div className="mt-12 grid gap-0 md:grid-cols-3">
            {studioConfig.method.map((step, i) => (
              <div
                key={step}
                className="border-b border-dirty-white/10 py-8 md:border-b-0 md:border-r md:px-8 md:last:border-r-0"
              >
                <p className="label-code text-dirty-white/25">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[12px] uppercase tracking-[0.16em] text-[#E8E6E1]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Founder */}
      <ScrollReveal className="mx-auto max-w-[1600px] px-4 py-16 md:px-6 md:py-24">
        <p className="label-code text-faded">04 — FOUNDER</p>
        <div className="mt-10 grid gap-10 md:grid-cols-[280px_1fr]">
          <div className="relative aspect-[3/4] bg-[#111111]">
            <div className="media-pending absolute inset-0">Portrait Pending</div>
          </div>
          <div>
            <p className="label-code text-dirty-white/35">{FOUNDER.role}</p>
            <h2 className="heading-section mt-3 text-[#E8E6E1]">{FOUNDER.name}</h2>
            <p className="label-code mt-4 text-dirty-white/40">
              {FOUNDER.location.toUpperCase()}
            </p>
            <div className="mt-8 max-w-md space-y-4">
              {FOUNDER.bio.map((line) => (
                <p key={line} className="body-copy text-dirty-white/55">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 05 — Location */}
      <section className="border-t border-dirty-white/10 px-4 py-12 md:px-6">
        <div className="mx-auto max-w-[1600px]">
          <p className="label-code text-faded">05 — LOCATION</p>
          <p className="label-code mt-4 text-dirty-white/50">OPERATING FROM</p>
          <p className="heading-section mt-2 text-[#E8E6E1]">
            {studioConfig.location.toUpperCase()}
          </p>
        </div>
      </section>

      {/* 06 — Credits */}
      <ScrollReveal className="mx-auto max-w-[1600px] border-t border-dirty-white/10 px-4 py-16 md:px-6">
        <p className="label-code text-faded">06 — CREDITS</p>
        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            ["Creative Direction", FOUNDER.name],
            ["Photography", "Studio Archive"],
            ["Web", "Wilson Collective Group LLC"],
            ["Manufacturing", "Independent Partners"],
          ].map(([role, name]) => (
            <div key={role}>
              <dt className="label-code text-dirty-white/35">{role}</dt>
              <dd className="mt-1 text-[12px] uppercase tracking-[0.14em] text-dirty-white/70">
                {name}
              </dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>

      {/* 07 — Contact */}
      <section className="border-t border-dirty-white/10 bg-[#0A0A0A] px-4 py-16 md:px-6">
        <div className="mx-auto max-w-[1600px]">
          <p className="label-code text-faded">07 — CONTACT</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {["GENERAL", "ORDERS", "PRESS", "COLLABORATIONS", "WHOLESALE"].map(
              (topic) => (
                <Link
                  key={topic}
                  href={`/contact/?topic=${topic.toLowerCase()}`}
                  className="btn-ghost focus-ring"
                >
                  {topic}
                </Link>
              )
            )}
          </div>
          <Link
            href="/studio/experience/"
            className="link-nav mt-16 inline-block focus-ring"
          >
            Enter Studio Experience
          </Link>
        </div>
      </section>
    </div>
  );
}
