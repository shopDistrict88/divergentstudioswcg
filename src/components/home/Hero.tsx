"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { releaseConfig } from "@/lib/releaseConfig";
import TextureOverlay from "@/components/shared/TextureOverlay";
import ParallaxMedia from "@/components/shared/ParallaxMedia";

/** Full-screen cinematic landing — one image, one world */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduced) return;
    el.muted = true;
    el.playsInline = true;
    el.play().catch(() => {});
  }, [reduced]);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black">
      <ParallaxMedia className="absolute inset-0 hover-zoom" intensity={8}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={releaseConfig.media.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!reduced && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: ready ? 0.88 : 0 }}
            src={releaseConfig.media.film}
            muted
            playsInline
            loop
            preload="metadata"
            poster={releaseConfig.media.poster}
            onPlaying={() => setReady(true)}
            aria-hidden
          />
        )}
      </ParallaxMedia>

      <TextureOverlay />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60"
        aria-hidden
      />

      <div className="relative z-10 flex w-full flex-col items-center px-4 text-center">
        <motion.p
          className="heading-display text-dirty-white"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Divergent
        </motion.p>
        <motion.p
          className="label-code mt-6 text-faded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {releaseConfig.code} Collection
        </motion.p>
        <motion.p
          className="mt-4 text-[13px] tracking-[0.08em] text-dirty-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Built Different.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/shop/"
            className="btn-ghost mt-12 inline-flex focus-ring"
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
