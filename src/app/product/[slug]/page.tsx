import { notFound } from "next/navigation";
import { products, exhibitions } from "@/lib/data";
import ProductPageContent from "@/components/product-page-content";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
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
