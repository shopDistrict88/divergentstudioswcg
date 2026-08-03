"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, useTransform } from "framer-motion";
import type { RoomConfig } from "@/lib/scenes/types";
import { useParallax } from "./use-parallax";
import { useReducedMotion, useIsMobile } from "./use-reduced-motion";
import SceneLayer from "./scene-layer";
import SceneHotspot from "./scene-hotspot";
import SceneParticles from "./scene-particles";
import SceneVignette from "./scene-vignette";
import SceneGrain from "./scene-grain";
import SceneFlashlight from "./scene-flashlight";

/** Background depth — moves least of all layers */
const BACKGROUND_DEPTH = 0.06;

type LivingSceneProps = {
  room: RoomConfig;
  onNavigate?: (target: string) => void;
  onReveal?: (label: string) => void;
  showHotspotDebug?: boolean;
};

export default function LivingScene({
  room,
  onNavigate,
  onReveal,
  showHotspotDebug = false,
}: LivingSceneProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [hoveredHotspots, setHoveredHotspots] = useState<Set<string>>(
    () => new Set()
  );

  const fallback = reducedMotion
    ? room.reducedMotionFallback
    : isMobile
      ? room.mobileFallback
      : undefined;

  const parallaxEnabled = !fallback?.disableParallax && !reducedMotion;
  const particlesEnabled = !fallback?.disableParticles && !reducedMotion;
  const animationsDisabled =
    Boolean(fallback?.disableAnimations) || reducedMotion;
  const flashlightEnabled =
    room.lighting.flashlight !== false && !reducedMotion;

  const { x, y, cursorX, cursorY } = useParallax(parallaxEnabled, isMobile);

  const bgX = useTransform(x, (v) => v * BACKGROUND_DEPTH);
  const bgY = useTransform(y, (v) => v * BACKGROUND_DEPTH);

  const sortedLayers = useMemo(
    () => [...room.layers].sort((a, b) => a.depth - b.depth),
    [room.layers]
  );

  const visibleLayers = useMemo(() => {
    if (!fallback?.simplifiedLayerIds) return sortedLayers;
    return sortedLayers.filter(
      (l) =>
        fallback.simplifiedLayerIds!.includes(l.id) ||
        l.type === "overlay" ||
        l.type === "light"
    );
  }, [sortedLayers, fallback?.simplifiedLayerIds]);

  const handleHotspotHover = useCallback((id: string, hovered: boolean) => {
    setHoveredHotspots((prev) => {
      const next = new Set(prev);
      if (hovered) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const bgStyle = room.background.startsWith("/")
    ? {
        backgroundImage: `url(${room.background})`,
        backgroundSize: "cover" as const,
        backgroundPosition: "center" as const,
      }
    : { background: room.background };

  return (
    <div className="living-scene relative h-full w-full overflow-hidden bg-[#050505]">
      {/* Background — lowest parallax */}
      <motion.div
        className="absolute inset-[-3%]"
        style={{
          ...bgStyle,
          x: parallaxEnabled ? bgX : 0,
          y: parallaxEnabled ? bgY : 0,
        }}
      >
        {room.lighting.ambientGlow && (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${room.lighting.ambientGlow}, transparent 70%)`,
            }}
          />
        )}
      </motion.div>

      {/* Scene layers */}
      <div className="absolute inset-0">
        {visibleLayers.map((layer) => {
          const linkedRevealed =
            layer.linkedHotspotId &&
            hoveredHotspots.has(layer.linkedHotspotId);
          const layerWithOpacity =
            linkedRevealed && (layer.opacity === 0 || layer.opacity == null)
              ? { ...layer, opacity: 0.75 }
              : layer;

          return (
            <SceneLayer
              key={layer.id}
              layer={
                animationsDisabled
                  ? { ...layerWithOpacity, animation: { type: "none" } }
                  : layerWithOpacity
              }
              parallaxX={x}
              parallaxY={y}
              reducedMotion={reducedMotion}
            />
          );
        })}
      </div>

      {/* Particles */}
      {particlesEnabled && room.particles && (
        <SceneParticles
          dustCount={room.particles.dust}
          hazeOpacity={room.particles.haze}
          className="z-[20]"
        />
      )}

      {/* Cursor-reactive lighting gradient */}
      <SceneFlashlight
        cursorX={cursorX}
        cursorY={cursorY}
        enabled={flashlightEnabled}
        intensity={room.lighting.intensity}
        color={room.lighting.color}
      />

      {/* Hotspots */}
      {room.hotspots.map((hotspot) => (
        <HotspotWrapper
          key={hotspot.id}
          hotspot={hotspot}
          onNavigate={onNavigate}
          onReveal={onReveal}
          showDebug={showHotspotDebug}
          onHover={handleHotspotHover}
        />
      ))}

      {/* Vignette + grain */}
      <SceneVignette intensity={room.lighting.vignette ?? 0.5} />
      <SceneGrain />
    </div>
  );
}

function HotspotWrapper({
  hotspot,
  onNavigate,
  onReveal,
  showDebug,
  onHover,
}: {
  hotspot: import("@/lib/scenes/types").SceneHotspot;
  onNavigate?: (target: string) => void;
  onReveal?: (label: string) => void;
  showDebug?: boolean;
  onHover: (id: string, hovered: boolean) => void;
}) {
  return (
    <div
      onMouseEnter={() => onHover(hotspot.id, true)}
      onMouseLeave={() => onHover(hotspot.id, false)}
      className="contents"
    >
      <SceneHotspot
        hotspot={hotspot}
        onNavigate={onNavigate}
        onReveal={onReveal}
        showDebug={showDebug}
      />
    </div>
  );
}
