"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/data";

interface AddToCartButtonProps {
  product: Product;
  size: string;
}

export default function AddToCartButton({ product, size }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Button onClick={handleClick} className="w-full" disabled={added}>
      {added ? "Added to Cart" : "Add to Cart"}
    </Button>
  );
}
