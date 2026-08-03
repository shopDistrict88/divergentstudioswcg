"use client";

import { useEffect, useState } from "react";

/** Returns the URL only after confirming the asset loads in the browser. */
export function useMediaAvailable(src: string | null | undefined): string | null {
  const [available, setAvailable] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      setAvailable(null);
      return;
    }

    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setAvailable(src);
    };
    img.onerror = () => {
      if (!cancelled) setAvailable(null);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  return available;
}
