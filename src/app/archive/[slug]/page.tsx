"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { releaseConfig } from "@/lib/releaseConfig";
import { studioConfig } from "@/lib/studioConfig";
import { useProducts } from "@/context/products-context";
import ScrollReveal from "@/components/shared/ScrollReveal";
import TextureOverlay from "@/components/shared/TextureOverlay";
import { productImageTones } from "@/lib/data";
import { objectStatus } from "@/lib/objectStatus";

type Props = { params: Promise<{ slug: string }> };

const ARCHIVE_FILES: Record<
  string,
  {
    archiveNumber: string;
    name: string;
    type: string;
    developed: string;
    released: string;
    status: string;
    returnStatus?: string;
  }
> = {
  nova: {
    archiveNumber: "001",
    name: "NOVA",
    type: "EXHIBITION",
    developed: "2025–2026",
    released: "2026",
    status: "ACTIVE ARCHIVE",
    returnStatus: "UNDER CONSIDERATION",
  },
};

export default function ArchiveFilePage({ params }: Props) {
  const { slug } = use(params);
  const file = ARCHIVE_FILES[slug];
  const { products, isLoading } = useProducts();
  const preview = studioConfig.archivePreview;

  if (!file) notFound();

  return (
    <div className="min-h-screen bg-[#050505] pt-16 md:pt-20">
      <section className="relative min-h-[50vh] overflow-hidden border-b border-dirty-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={releaseConfig.media.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <TextureOverlay />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-[1600px] px-4 pb-12 pt-8 md:px-6">
          <Link href="/archive/" className="label-code text-faded focus-ring">
            ← Archive
          </Link>
          <p className="label-code mt-10 text-dirty-white/40">
            ARCHIVE FILE {file.archiveNumber}
          </p>
          <h1 className="heading-display mt-2 text-[#E8E6E1]">{file.name}</h1>
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["TYPE", file.type],
              ["DEVELOPED", file.developed],
              ["RELEASED", file.released],
              ["STATUS", file.status],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label-code text-dirty-white/35">{k}</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-dirty-white/75">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-6">
            <span className="label-code text-dirty-white/35">
              {preview.releasedPieces} RELEASED PIECES
            </span>
            <span className="label-code text-dirty-white/35">
              {preview.prototypes} PROTOTYPES
            </span>
            <span className="label-code text-dirty-white/35">
              {preview.developmentFiles} DEVELOPMENT FILES
            </span>
          </div>
        </div>
      </section>

      <ScrollReveal className="mx-auto max-w-[1600px] px-4 py-16 md:px-6">
        <p className="label-code text-faded">RELEASED PIECES</p>
        {isLoading ? (
          <p className="label-code mt-8 text-faded">Loading…</p>
        ) : (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {products.map((p) => {
              const img = p.images?.[0];
              const tone = img?.tone || "slate";
              return (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.slug}/`}
                    className="group flex gap-5 border border-dirty-white/10 bg-[#111111] p-4 focus-ring"
                  >
                    <div
                      className={`relative h-24 w-20 flex-shrink-0 overflow-hidden bg-gradient-to-br ${productImageTones[tone]}`}
                    >
                      {img?.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img.src}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#E8E6E1]">
                        {p.name}
                      </p>
                      <p className="label-code mt-2 text-dirty-white/35">
                        ${p.price} ·{" "}
                        {objectStatus(p) === "CLOSED" ? "SOLD OUT" : "ARCHIVED"}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </ScrollReveal>

      {file.returnStatus && (
        <section className="border-t border-dirty-white/10 px-4 py-12 md:px-6">
          <div className="mx-auto max-w-[1600px]">
            <p className="label-code text-faded">RETURN STATUS</p>
            <p className="label-code mt-4 text-dirty-white/60">
              {file.returnStatus}
            </p>
            <Link href="/contact/?topic=returns" className="btn-ghost mt-8 focus-ring">
              Request Return
            </Link>
          </div>
        </section>
      )}

      <ScrollReveal className="mx-auto max-w-[1600px] border-t border-dirty-white/10 px-4 py-16 md:px-6">
        <p className="label-code text-faded">RELATED JOURNAL FILES</p>
        <ul className="mt-8 space-y-3">
          {studioConfig.journalPreview.slice(0, 3).map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/journal/${entry.slug}/`}
                className="label-code text-dirty-white/50 hover:text-[#E8E6E1] focus-ring"
              >
                JOURNAL {entry.entryNumber} — {entry.title}
              </Link>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </div>
  );
}
