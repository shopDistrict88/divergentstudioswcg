"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedTextReveal from "@/components/animated-text-reveal";
import SectionHeading from "@/components/section-heading";
import ProductCard from "@/components/product-card";
import JournalCard from "@/components/journal-card";
import ArchiveCard from "@/components/archive-card";
import { exhibitions, products, journalPosts } from "@/lib/data";
import { Input } from "@/components/ui/input";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const nova = exhibitions.find((e) => e.id === "nova")!;
  const featuredProducts = products.slice(0, 3);
  const featuredPosts = journalPosts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100vh] items-center justify-center overflow-hidden"
      >
        {/* Parallax glow */}
        <motion.div
          style={{ y: heroY }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--accent)]/20 blur-[160px]" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-2xl px-4 text-center"
        >
          <AnimatedTextReveal
            as="h1"
            className="text-4xl font-bold uppercase tracking-[0.15em] text-white md:text-6xl text-glow"
          >
            Divergent Studios
          </AnimatedTextReveal>

          <AnimatedTextReveal
            as="p"
            delay={0.5}
            className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60 md:text-base"
          >
            Wearable art. Limited exhibitions.
          </AnimatedTextReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild>
              <Link href="/exhibitions/nova">
                Enter Exhibition <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/collection">View Collection</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Exhibition */}
      <FeaturedExhibitionSection exhibition={nova} />

      {/* Featured Pieces */}
      <section className="section-spacing mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          title="Featured Pieces"
          subtitle="Limited drops from EXHIBITION 001: NOVA"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Studio Journal Preview */}
      <section className="section-spacing mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading title="Studio Journal" />
          <Link
            href="/journal"
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 hover:text-white transition"
          >
            View All
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredPosts.map((post, i) => (
            <JournalCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* Archive Teaser */}
      <section className="section-spacing mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          title="Exhibition Archive"
          subtitle="Past and upcoming exhibitions"
        />
        <div className="grid gap-6 md:grid-cols-2">
          <ArchiveCard exhibition={nova} index={0} />
          <ArchiveCard locked index={1} />
        </div>
      </section>

      {/* Studio Pass Signup */}
      <StudioPassTeaser />
    </>
  );
}

function FeaturedExhibitionSection({ exhibition }: { exhibition: typeof exhibitions[0] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing relative mx-auto max-w-7xl px-4 md:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a0b10] via-[#0d0d0d] to-[#0d0d0d] p-8 md:p-12"
      >
        <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/20 blur-[120px]" />
        <div className="relative z-10 max-w-lg">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--accent)] mb-2">
            Now Showing
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-[0.15em] text-white md:text-4xl">
            {exhibition.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            {exhibition.meaning}
          </p>
          <Button asChild className="mt-8">
            <Link href={`/exhibitions/${exhibition.slug}`}>
              View Exhibition <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

function StudioPassTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing relative mx-auto max-w-7xl px-4 md:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-8 text-center md:p-16"
      >
        <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white md:text-xl">
          Studio Pass
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
          Get invited before the doors open. Early access, private archives, and exhibition announcements.
        </p>
        <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <Input type="email" placeholder="Enter your email" className="flex-1" />
          <Button type="submit">Join</Button>
        </form>
      </motion.div>
    </section>
  );
}
