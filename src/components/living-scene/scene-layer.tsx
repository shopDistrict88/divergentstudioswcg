"use client";

import type { CSSProperties } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import type { SceneLayer as SceneLayerType } from "@/lib/scenes/types";
import { getIdleAnimation, getTransformOrigin } from "./scene-animations";

type SceneLayerProps = {
  layer: SceneLayerType;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reducedMotion: boolean;
};

export default function SceneLayer({
  layer,
  parallaxX,
  parallaxY,
  reducedMotion,
}: SceneLayerProps) {
  const x = useTransform(parallaxX, (v) => v * layer.depth);
  const y = useTransform(parallaxY, (v) => v * layer.depth);

  const pos = layer.position ?? {
    x: "0%",
    y: "0%",
    width: "100%",
    height: "100%",
  };

  const idleAnim = getIdleAnimation(layer.animation, reducedMotion);
  const transformOrigin = getTransformOrigin(layer.animation);

  const backgroundStyle = layer.src
    ? {
        backgroundImage: `url(${layer.src})`,
        backgroundSize: "cover" as const,
        backgroundPosition: "center" as const,
      }
    : layer.gradient
      ? { background: layer.gradient }
      : {};

  const content =
    layer.type === "video" && layer.src ? (
      <video
        src={layer.src}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
    ) : (
      <div className="h-full w-full" style={backgroundStyle} />
    );

  return (
    <motion.div
      className="absolute overflow-hidden"
      style={{
        left: pos.x,
        top: pos.y,
        width: pos.width,
        height: pos.height,
        opacity: layer.opacity ?? 1,
        mixBlendMode:
          (layer.blendMode as CSSProperties["mixBlendMode"]) ?? "normal",
        zIndex: layer.zIndex ?? Math.round(layer.depth * 100),
        transformOrigin: transformOrigin ?? "50% 50%",
        x,
        y,
      }}
      animate={idleAnim}
    >
      {content}
    </motion.div>
  );
}
