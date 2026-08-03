"use client";

import { textureConfig } from "@/lib/textureConfig";

type Props = {
  className?: string;
};

/** Selective photocopy grain — respects textureConfig */
export default function TextureOverlay({ className = "" }: Props) {
  if (!textureConfig.enabled) return null;
  return (
    <div
      className={`texture-grain pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    />
  );
}
