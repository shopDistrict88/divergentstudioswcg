"use client";

import { studioConfig } from "@/lib/studioConfig";
import ScrollReveal from "@/components/shared/ScrollReveal";

/** Section 2 — live studio status strip */
export default function StudioStatusStrip() {
  const { items } = studioConfig.status;

  return (
    <section className="border-y border-dirty-white/10 bg-[#0A0A0A]">
      <ScrollReveal className="mx-auto max-w-[1600px] px-4 py-4 md:px-6">
        <p className="label-code mb-3 text-dirty-white/30">STUDIO STATUS</p>
        <div className="flex gap-8 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <div key={item.label} className="flex shrink-0 items-center gap-3">
              <span className="status-pulse" aria-hidden />
              <span className="label-code text-dirty-white/35">{item.label}</span>
              <span className="label-code text-dirty-white/70">—</span>
              <span className="label-code text-dirty-white/85">{item.value}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
