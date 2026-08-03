"use client";

import Link from "next/link";
import { archiveEntries } from "@/data/archive";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function ArchiveStrip() {
  return (
    <section className="border-t border-dirty-white/10 bg-black section-cinematic">
      <div className="mx-auto max-w-[1100px]">
        <ScrollReveal>
          <div className="flex items-baseline justify-between gap-4">
            <p className="label-code text-faded">Archive</p>
            <Link href="/archive/" className="link-nav focus-ring">
              Enter
            </Link>
          </div>
        </ScrollReveal>

        <ul className="mt-12">
          {archiveEntries.slice(0, 3).map((e, i) => (
            <ScrollReveal key={e.id} delay={i * 0.08}>
              <li>
                {e.href ? (
                  <Link
                    href={e.href}
                    className="block border-b border-dirty-white/10 py-7 transition hover:bg-dirty-white/[0.02] focus-ring"
                  >
                    <div className="grid grid-cols-[72px_1fr_auto] items-baseline gap-4">
                      <span className="font-code text-lg tracking-[0.12em] text-dirty-white/85">
                        {e.id}
                      </span>
                      <span className="text-[13px] uppercase tracking-[0.14em] text-dirty-white/75">
                        {e.code}
                      </span>
                      <span className="label-code text-faded">
                        {e.status}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="grid grid-cols-[72px_1fr_auto] items-baseline gap-4 border-b border-dirty-white/10 py-7">
                    <span className="font-code text-lg tracking-[0.12em] text-dirty-white/85">
                      {e.id}
                    </span>
                    <span className="text-[13px] uppercase tracking-[0.14em] text-dirty-white/75">
                      {e.code}
                    </span>
                    <span className="label-code text-faded">
                      {e.status}
                    </span>
                  </div>
                )}
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
