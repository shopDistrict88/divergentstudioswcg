import { Badge } from "@/components/ui/badge";
import type { Product, Exhibition } from "@/lib/data";

interface ProductPlaqueProps {
  product: Product;
  exhibition?: Exhibition;
}

export default function ProductPlaque({ product, exhibition }: ProductPlaqueProps) {
  return (
    <div className="museum-plaque rounded-lg">
      <p className="text-[10px] text-white/40 mb-1">
        {exhibition?.title || "DIVERGENT STUDIOS"}
      </p>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
        {product.name}
      </p>
      <p className="mt-1 text-[10px] text-white/50">${product.price}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {product.tags.map((tag) => (
          <Badge key={tag} variant="subtle" className="text-[8px]">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
