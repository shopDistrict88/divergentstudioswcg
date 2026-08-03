"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/data";

interface AddToCartButtonProps {
  product: Product;
  size: string | null;
  onRequireSize?: () => void;
}

export default function AddToCartButton({
  product,
  size,
  onRequireSize,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    if (!size) {
      onRequireSize?.();
      return;
    }
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={added}
      className="btn-primary w-full focus-ring disabled:opacity-50"
    >
      {added ? "Added to Bag" : "Add to Bag"}
    </button>
  );
}
