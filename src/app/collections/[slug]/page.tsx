"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { releaseConfig } from "@/lib/releaseConfig";
import { studioConfig } from "@/lib/studioConfig";
import { useProducts } from "@/context/products-context";
import ScrollReveal from "@/components/shared/ScrollReveal";
import TextureOverlay from "@/components/shared/TextureOverlay";
import { productImageTones } from "@/lib/data";
import { objectStatus } from "@/lib/objectStatus";

type Props = { params: Promise<{ slug: string }> };

const COLLECTIONS: Record<string, typeof releaseConfig> = {
  nova: releaseConfig,
};

export default function CollectionPage({ params }: Props) {
  const { slug } = use(params);
  const collection = COLLECTIONS[slug];
  const { products, isLoading } = useProducts();

  if (!collection) notFound();

  const statement = studioConfig.collection.statement;
  const meta = studioConfig.collection.heroMeta;

  return (
    <div className="bg-[#050505] pt-14 md:pt-16">
      {/* 01 — Collection Hero */}
      <section className="relative min-h-[70vh] overflow-hidden border-b border-dirty-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={collection.media.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <TextureOverlay />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1600px] flex-col justify-end px-4 pb-12 md:px-6">
          <p className="label-code text-dirty-white/50">
            EXHIBITION {collection.id}
          </p>
          <h1 className="heading-display mt-2 text-[#E8E6E1]">
            {collection.code}
          </h1>
          <p className="label-code mt-4 text-dirty-white/50">
            {collection.year}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <span className="label-code text-dirty-white/35">{meta.pieces}</span>
            <span className="label-code text-dirty-white/35">{meta.production}</span>
            <span className="label-code text-dirty-white/35">{meta.file}</span>
          </div>
        </div>
      </section>

      {/* 02 — Collection Statement */}
      <ScrollReveal className="mx-auto max-w-[1600px] px-4 py-16 md:px-6 md:py-24">
        <p className="label-code text-faded">{statement.exhibition}</p>
        <div className="mt-8 max-w-xl space-y-1">
          {statement.body.map((line, i) =>
            line ? (
              <p key={i} className="body-copy text-dirty-white/55">
                {line}
              </p>
            ) : (
              <br key={i} />
            )
          )}
        </div>
      </ScrollReveal>

      {/* 03 — Available Pieces */}
      <section className="border-t border-dirty-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-[1600px]">
          <p className="label-code text-faded">AVAILABLE PIECES</p>
          {isLoading ? (
            <p className="label-code mt-10 text-dirty-white/30">Preparing…</p>
          ) : (
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {products.map((p, i) => {
                const img = p.images?.[0];
                const tone = img?.tone || "slate";
                const status = objectStatus(p);
                return (
                  <li key={p.id} className={i % 2 === 1 ? "sm:mt-12" : undefined}>
                    <Link
                      href={`/products/${p.slug}/`}
                      className="group block focus-ring"
                    >
                      <div
                        className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${productImageTones[tone]}`}
                      >
                        {img?.src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={img.src}
                            alt={img.alt || p.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="media-pending absolute inset-0">
                            Image Pending
                          </div>
                        )}
                      </div>
                      <div className="mt-5 flex items-baseline justify-between">
                        <div>
                          <p className="text-[12px] uppercase tracking-[0.16em] text-[#E8E6E1]">
                            {p.name}
                          </p>
                          <p className="label-code mt-2 text-dirty-white/35">
                            ${p.price}
                          </p>
                        </div>
                        <span className="label-code text-dirty-white/45">
                          {status === "CLOSED" ? "SOLD OUT" : "AVAILABLE"}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* 04 — Campaign */}
      <section className="border-t border-dirty-white/10">
        <Link href="/campaign/" className="group block focus-ring">
          <div className="relative aspect-[21/9] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={collection.media.poster}
              alt=""
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-end p-8 md:p-12">
              <div>
                <p className="label-code text-dirty-white/50">CAMPAIGN</p>
                <p className="heading-section mt-2 text-[#E8E6E1]">
                  VIEW CAMPAIGN
                </p>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* 07 — Related Journal */}
      <ScrollReveal className="mx-auto max-w-[1600px] border-t border-dirty-white/10 px-4 py-16 md:px-6">
        <p className="label-code text-faded">RELATED JOURNAL ENTRIES</p>
        <ul className="mt-8 space-y-4">
          {studioConfig.journalPreview.slice(0, 2).map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/journal/${entry.slug}/`}
                className="group flex items-baseline justify-between border-b border-dirty-white/10 py-4 focus-ring"
              >
                <div>
                  <p className="label-code text-dirty-white/35">
                    JOURNAL {entry.entryNumber}
                  </p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-dirty-white/75 group-hover:text-[#E8E6E1]">
                    {entry.title}
                  </p>
                </div>
                <span className="label-code text-dirty-white/30">{entry.date}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/journal/" className="link-nav mt-10 inline-block focus-ring">
          Open Journal
        </Link>
      </ScrollReveal>
    </div>
  );
}
