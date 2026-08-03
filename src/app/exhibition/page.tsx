"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useExhibitions } from "@/context/exhibitions-context";
import { useProducts } from "@/context/products-context";
import { useJournal } from "@/context/journal-context";
import ArtifactCard from "@/components/exhibition/artifact-card";
import AmbientLayer from "@/components/exhibition/ambient-layer";

export default function NovaExhibitionPage() {
  const { exhibitions } = useExhibitions();
  const { products } = useProducts();
  const { journalPosts } = useJournal();

  const exhibition =
    exhibitions.find((e) => e.slug === "nova" || e.id === "nova") ??
    exhibitions[0];
  const lineup = products.filter(
    (p) => p.exhibitionId === (exhibition?.id ?? "nova")
  );
  const journalTeaser = journalPosts.slice(0, 2);

  return (
    <div className="bg-[#050505]">
      {/* 1. Title */}
      <section className="section-viewport relative flex items-end overflow-hidden px-6 pb-20 pt-32 md:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#1a1a1e_0%,#050505_65%)]" />
        <AmbientLayer dust={12} className="z-[1]" />
        <div className="vignette z-[2]" />
        <div className="relative z-10 max-w-3xl">
          <p className="label-caps">Exhibition 001</p>
          <h1 className="font-display mt-4 text-5xl tracking-[0.18em] text-white/95 md:text-7xl">
            Nova
          </h1>
          <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-[var(--signal)]">
            {exhibition?.status ?? "LIVE"} · {exhibition?.year ?? "2026"}
          </p>
          <p className="mt-8 max-w-md text-sm leading-[1.9] text-white/50">
            {exhibition?.meaning ??
              "Choosing the unknown — the instant curiosity outweighs fear."}
          </p>
          <p className="mt-16 text-[10px] uppercase tracking-[0.4em] text-white/30">
            Scroll
          </p>
        </div>
      </section>

      {/* 2. Narrative */}
      <section className="border-t border-white/10 px-6 py-24 md:px-16 md:py-32">
        <p className="label-caps">Narrative</p>
        <div className="mt-10 max-w-2xl space-y-6">
          {(
            exhibition?.statement ?? [
              "NOVA is about choosing the unknown.",
              "Every stitch represents the weight of that decision.",
              "Not a costume. Not a trend. A uniform for those who refuse to remain where they started.",
            ]
          ).map((line) => (
            <motion.p
              key={line}
              className="font-display text-xl leading-relaxed tracking-[0.04em] text-white/70 md:text-2xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </section>

      {/* 3–4. Campaign + subjects */}
      <section className="border-t border-white/10 px-6 py-24 md:px-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`relative overflow-hidden bg-[#0c0c0e] ${
                i === 0 ? "md:col-span-2 md:aspect-[16/10]" : "aspect-[3/4]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#151518] to-[#080808]" />
              <p className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.3em] text-white/30">
                {i === 0 ? "Campaign frame" : `Subject ${i}`} — replace media
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5–6. Artifacts */}
      <section className="border-t border-white/10 px-6 py-24 md:px-16 md:py-32">
        <p className="label-caps">Artifacts</p>
        <h2 className="font-display mt-3 text-3xl tracking-[0.1em] text-white/90">
          The lineup
        </h2>
        <p className="mt-4 max-w-md text-sm text-white/40">
          Limited run. No restock.{" "}
          {exhibition?.edition ?? "Each piece is an artifact of the exhibition."}
        </p>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {lineup.map((p, i) => (
            <ArtifactCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* 7. Materials */}
      <section className="border-t border-white/10 px-6 py-24 md:px-16">
        <p className="label-caps">Construction</p>
        <h2 className="font-display mt-3 text-3xl tracking-[0.1em] text-white/90">
          Material &amp; process
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            {
              t: "Heavyweight",
              d: "Premium brushed fleece and structured panels built for permanence.",
            },
            {
              t: "Precision",
              d: "Tailored seams and intentional hardware — equipment, not costume.",
            },
            {
              t: "Authentication",
              d: "NFC-ready packaging and archival documentation with each artifact.",
            },
          ].map((item) => (
            <div key={item.t} className="border-t border-white/15 pt-6">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">
                {item.t}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Journal teaser */}
      <section className="border-t border-white/10 px-6 py-24 md:px-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="label-caps">Journal</p>
            <h2 className="font-display mt-3 text-3xl tracking-[0.1em] text-white/90">
              Behind the exhibition
            </h2>
          </div>
          <Link
            href="/journal/"
            className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white/80 focus-ring"
          >
            All entries
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {journalTeaser.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.slug}/`}
              className="group border-t border-white/10 pt-6 focus-ring"
            >
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                {post.date}
              </p>
              <h3 className="font-display mt-3 text-xl text-white/80 group-hover:text-white">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 9–10. Release + CTA */}
      <section className="border-t border-white/10 px-6 py-24 text-center md:px-16 md:py-32">
        <p className="label-caps">Release</p>
        <p className="font-display mx-auto mt-6 max-w-lg text-2xl tracking-[0.08em] text-white/80">
          {exhibition?.edition ?? "Limited run. No restock."}
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/shop/" className="btn-primary focus-ring">
            Enter Artifact Catalog
          </Link>
          <Link href="/studio/" className="btn-secondary focus-ring">
            Studio Tour
          </Link>
        </div>
      </section>
    </div>
  );
}
