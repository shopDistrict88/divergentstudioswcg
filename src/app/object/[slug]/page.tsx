"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useProducts } from "@/context/products-context";
import ObjectPageContent from "@/components/product/ObjectPageContent";
import { objectCode } from "@/lib/objectStatus";

type Props = { params: Promise<{ slug: string }> };

export default function ObjectPage({ params }: Props) {
  const { slug } = use(params);
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center pt-20">
        <p className="label-code text-dirty-white/35">Preparing…</p>
      </div>
    );
  }

  const index = products.findIndex((p) => p.slug === slug);
  const product = index >= 0 ? products[index] : undefined;
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <ObjectPageContent
      product={product}
      objectNo={objectCode(index)}
      related={related}
    />
  );
}
