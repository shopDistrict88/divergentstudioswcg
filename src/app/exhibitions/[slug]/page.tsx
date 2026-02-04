import Link from "next/link";
import { notFound } from "next/navigation";
import { exhibitions, products } from "@/lib/data";
import ExhibitionHero from "@/components/exhibition-hero";
import LookbookScroller from "@/components/lookbook-scroller";
import SectionHeading from "@/components/section-heading";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return exhibitions.map((e) => ({ slug: e.slug }));
}

export default async function ExhibitionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exhibition = exhibitions.find((e) => e.slug === slug);

  if (!exhibition) {
    notFound();
  }

  const exhibitionProducts = products.filter(
    (p) => p.exhibitionId === exhibition.id
  );

  return (
    <>
      <ExhibitionHero exhibition={exhibition} />

      {/* Statement */}
      <section className="section-spacing mx-auto max-w-3xl px-4 text-center md:px-8">
        <div className="space-y-4">
          {exhibition.statement.map((line, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-white/60 md:text-base"
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* Lookbook */}
      <LookbookScroller />

      {/* Featured Pieces */}
      <section className="section-spacing mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          title="Featured Pieces"
          subtitle="From EXHIBITION 001: NOVA"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exhibitionProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Exhibition Details */}
      <section className="section-spacing mx-auto max-w-7xl px-4 md:px-8">
        <div className="surface-card rounded-2xl p-8 text-center md:p-12">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--accent)] mb-2">
            Edition
          </p>
          <p className="text-lg font-semibold uppercase tracking-[0.15em] text-white">
            {exhibition.edition}
          </p>
          <Button asChild className="mt-8">
            <Link href="/collection">
              Shop the Exhibition <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
