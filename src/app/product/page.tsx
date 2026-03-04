"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useProducts } from "@/context/products-context";
import { useExhibitions } from "@/context/exhibitions-context";
import ProductPageContent from "@/components/product-page-content";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ProductContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const { products } = useProducts();
  const { exhibitions } = useExhibitions();

  if (!slug) {
    return (
      <div className="section-spacing mx-auto max-w-2xl px-4 text-center">
        <p className="text-white/60 mb-6">Select a product from the collection.</p>
        <Button asChild variant="secondary">
          <Link href="/collection">View Collection</Link>
        </Button>
      </div>
    );
  }

  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="section-spacing mx-auto max-w-2xl px-4 text-center">
        <p className="text-white/60 mb-6">Product not found.</p>
        <Button asChild variant="secondary">
          <Link href="/collection">View Collection</Link>
        </Button>
      </div>
    );
  }

  const exhibition = exhibitions.find((e) => e.id === product.exhibitionId);
  const relatedProducts = products.filter(
    (p) => p.exhibitionId === product.exhibitionId && p.id !== product.id
  );

  return (
    <ProductPageContent
      product={product}
      exhibition={exhibition}
      relatedProducts={relatedProducts}
    />
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="section-spacing mx-auto max-w-2xl px-4 py-24 text-center text-white/50">Loading...</div>}>
      <ProductContent />
    </Suspense>
  );
}
