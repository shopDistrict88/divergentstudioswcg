"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { useProducts } from "@/context/products-context";
import { useJournal } from "@/context/journal-context";
import AmbientLayer from "./ambient-layer";
import { productImageTones } from "@/lib/data";
import {
  useIsMobile,
  useReducedMotion,
} from "@/components/living-scene/use-reduced-motion";

const PHILOSOPHY = [
  "We do not make clothing.",
  "We build exhibitions.",
  "Every collection is an idea.",
  "Every garment is an artifact.",
  "Every person becomes part of the story.",
];

export default function ExhibitionHall() {
  const { products } = useProducts();
  const { journalPosts } = useJournal();
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 40, damping: 25 });
  const y = useSpring(rawY, { stiffness: 40, damping: 25 });
  const bgX = useTransform(x, (v) => v * 0.3);
  const bgY = useTransform(y, (v) => v * 0.3);

  const { scrollYProgress } = useScroll();
  const lightY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const onMove = (e: React.MouseEvent) => {
    if (reducedMotion || isMobile) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    rawX.set(nx * 8);
    rawY.set(ny * 6);
  };

  const featured = products.slice(0, 3);
  const journalPreview = journalPosts.slice(0, 2);

  return (
    <div className="relative bg-[#050505]" onMouseMove={onMove}>
      <section className="section-viewport relative flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-[-4%]"
          style={reducedMotion ? undefined : { x: bgX, y: bgY }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,#1a1a1c_0%,#050505_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_40%,rgba(200,200,190,0.04)_100%)]" />
        </motion.div>

        {!reducedMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ y: lightY }}
            aria-hidden
          >
            <div className="absolute left-1/2 top-0 h-[60%] w-[40%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)]" />
          </motion.div>
        )}

        <AmbientLayer dust={isMobile ? 8 : 22} className="z-[2]" />
        <div className="vignette z-[3]" />

        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-6 text-center"
          style={reducedMotion ? undefined : { x, y }}
        >
          <p className="label-caps">Exhibition Hall</p>
          <h1 className="font-display mt-6 text-4xl tracking-[0.18em] text-white/95 md:text-6xl lg:text-7xl">
            Divergent Studios
          </h1>
          <p className="mt-6 text-[11px] uppercase tracking-[0.4em] text-white/50">
            Exhibition 001 — Nova
          </p>
          <p className="mx-auto mt-10 max-w-md text-sm leading-relaxed text-white/45">
            A digital location for wearable art. Explore the hall. Enter the
            exhibition. Collect the artifacts.
          </p>
          <p className="mt-16 text-[10px] uppercase tracking-[0.4em] text-white/30">
            Scroll to explore
          </p>
        </motion.div>
      </section>

      <section className="section-viewport relative flex items-end border-t border-white/10 px-6 pb-20 pt-32 md:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,255,255,0.03),transparent_55%)]" />
        <div className="relative z-10 grid w-full gap-12 md:grid-cols-2 md:items-end">
          <div>
            <p className="label-caps">Current Exhibition</p>
            <h2 className="font-display mt-4 text-3xl tracking-[0.12em] text-white/90 md:text-5xl">
              Exhibition 001
            </h2>
            <p className="font-display mt-2 text-2xl tracking-[0.2em] text-white/70 md:text-3xl">
              Nova
            </p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[var(--signal)]">
              Status — Live
            </p>
            <p className="mt-8 max-w-sm text-sm leading-[1.9] text-white/45">
              Choosing the unknown. The moment curiosity becomes stronger than
              fear — and the garment becomes equipment for that decision.
            </p>
            <Link href="/exhibition/" className="btn-primary mt-10 focus-ring">
              Enter Exhibition
            </Link>
          </div>
          <div className="relative aspect-[4/5] w-full max-w-md justify-self-end overflow-hidden bg-[#0c0c0e] md:max-w-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#16161a] via-[#0a0a0c] to-[#1a1218]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,rgba(255,255,255,0.07),transparent_50%)]" />
            <p className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.3em] text-white/35">
              Campaign visual — replace with final still
            </p>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 px-6 py-24 md:px-16 md:py-32">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="label-caps">Artifacts</p>
            <h2 className="font-display mt-3 text-3xl tracking-[0.1em] text-white/90 md:text-4xl">
              Featured pieces
            </h2>
          </div>
          <Link
            href="/shop/"
            className="text-[10px] uppercase tracking-[0.3em] text-white/40 transition hover:text-white/80 focus-ring"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((product, i) => {
            const tone = product.images?.[0]?.tone || "slate";
            return (
              <Link
                key={product.id}
                href={`/artifacts/${product.slug}/`}
                className="group block focus-ring"
              >
                <div
                  className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br transition duration-700 group-hover:brightness-110 ${productImageTones[tone]}`}
                >
                  {product.images?.[0]?.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.images[0].src}
                      alt={product.images[0].alt || product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
                      Artifact {String(i + 1).padStart(3, "0")}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/80">
                      {product.name}
                    </p>
                  </div>
                  <p className="text-[11px] text-white/50">${product.price}</p>
                </div>
              </Link>
            );
          })}
          {featured.length === 0 && (
            <p className="label-caps col-span-full py-20 text-center">
              Artifacts loading…
            </p>
          )}
        </div>
      </section>

      <section className="relative border-t border-white/10 px-6 py-24 md:px-16 md:py-32">
        <p className="label-caps">Archive</p>
        <h2 className="font-display mt-3 text-3xl tracking-[0.1em] text-white/90">
          Exhibition record
        </h2>
        <div className="mt-12 space-y-0 border-t border-white/10">
          <Link
            href="/exhibition/"
            className="flex flex-col gap-2 border-b border-white/10 py-8 transition hover:bg-white/[0.02] focus-ring md:flex-row md:items-center md:justify-between md:gap-8"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/80">
              Exhibition 001 — Nova
            </p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--signal)]">
              Active
            </p>
          </Link>
          <div className="flex flex-col gap-2 border-b border-white/10 py-8 md:flex-row md:items-center md:justify-between">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/25">
              Exhibition 002 — ████████
            </p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
              Access restricted
            </p>
          </div>
        </div>
        <Link
          href="/archive/"
          className="mt-10 inline-block text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white/80 focus-ring"
        >
          Enter archive
        </Link>
      </section>

      <section className="relative border-t border-white/10 px-6 py-24 md:px-16 md:py-32">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="label-caps">Journal</p>
            <h2 className="font-display mt-3 text-3xl tracking-[0.1em] text-white/90">
              Process &amp; film
            </h2>
          </div>
          <Link
            href="/journal/"
            className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white/80 focus-ring"
          >
            All entries
          </Link>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {journalPreview.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.slug}/`}
              className="group block focus-ring"
            >
              <div className="aspect-[16/10] bg-[#0c0c0e] transition group-hover:brightness-110">
                <div className="flex h-full items-end bg-gradient-to-br from-[#121214] to-[#080808] p-6">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                    {post.date}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/35">
                {post.tags?.[0] ?? "Studio Notes"}
              </p>
              <h3 className="font-display mt-2 text-xl tracking-[0.06em] text-white/85 group-hover:text-white">
                {post.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/40">
                {post.excerpt}
              </p>
            </Link>
          ))}
          {journalPreview.length === 0 && (
            <p className="label-caps">Journal entries will appear here.</p>
          )}
        </div>
      </section>

      <section className="section-viewport relative flex items-center border-t border-white/10 px-6 md:px-16">
        <div className="mx-auto max-w-2xl py-24">
          <p className="label-caps mb-14 text-center">Philosophy</p>
          <div className="space-y-8 text-center">
            {PHILOSOPHY.map((line, i) => (
              <motion.p
                key={line}
                className="font-display text-2xl tracking-[0.08em] text-white/80 md:text-3xl"
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              href="/philosophy/"
              className="text-[10px] uppercase tracking-[0.35em] text-white/40 hover:text-white/80 focus-ring"
            >
              Read philosophy
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-12 md:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-sm tracking-[0.2em] text-white/50">
            Divergent Studios
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/access/"
              className="text-[10px] uppercase tracking-[0.3em] text-white/35 hover:text-white/70 focus-ring"
            >
              Request access
            </Link>
            <Link
              href="/account/"
              className="text-[10px] uppercase tracking-[0.3em] text-white/35 hover:text-white/70 focus-ring"
            >
              Account
            </Link>
            <Link
              href="/studio/"
              className="text-[10px] uppercase tracking-[0.3em] text-white/35 hover:text-white/70 focus-ring"
            >
              Studio tour
            </Link>
          </div>
        </div>
        <p className="mt-8 text-[9px] uppercase tracking-[0.25em] text-white/20">
          © {new Date().getFullYear()} Divergent Studios
        </p>
      </footer>
    </div>
  );
}
