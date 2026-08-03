import type { RoomConfig } from "../types";

export const entranceRoom: RoomConfig = {
  id: "entrance",
  title: "Entrance",
  slug: "entrance",
  subtitle: "Threshold",
  background:
    "linear-gradient(180deg, #0a0a0c 0%, #12141a 40%, #1a1520 100%)",
  lighting: {
    flashlight: true,
    intensity: 0.35,
    color: "rgba(255, 248, 230, 0.12)",
    vignette: 0.55,
    ambientGlow: "rgba(189, 22, 64, 0.06)",
  },
  particles: { dust: 28, haze: 0.15 },
  entranceTransition: { type: "fade", duration: 1.2 },
  exitTransition: { type: "light-sweep", duration: 0.9 },
  layers: [
    {
      id: "door-frame",
      type: "overlay",
      depth: 0.15,
      gradient:
        "linear-gradient(90deg, #08080a 0%, transparent 8%, transparent 92%, #08080a 100%)",
      position: { x: "0%", y: "0%", width: "100%", height: "100%" },
      opacity: 0.9,
    },
    {
      id: "door-light-leak",
      type: "light",
      depth: 0.08,
      gradient:
        "linear-gradient(0deg, rgba(255, 220, 160, 0.18) 0%, transparent 12%)",
      position: { x: "38%", y: "72%", width: "24%", height: "28%" },
      animation: { type: "pulse", duration: 6, intensity: 0.4, delay: 0 },
      blendMode: "screen",
    },
    {
      id: "fluorescent-fixture",
      type: "light",
      depth: 0.2,
      gradient:
        "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(200, 230, 255, 0.25), transparent 70%)",
      position: { x: "20%", y: "0%", width: "60%", height: "35%" },
      animation: { type: "flicker", duration: 0.15, intensity: 0.6, delay: 2 },
      blendMode: "screen",
    },
    {
      id: "floor-shadow",
      type: "shadow",
      depth: 0.1,
      gradient:
        "radial-gradient(ellipse 60% 20% at 50% 100%, rgba(0,0,0,0.5), transparent 70%)",
      position: { x: "0%", y: "80%", width: "100%", height: "20%" },
      animation: { type: "drift", duration: 18, intensity: 0.3 },
    },
    {
      id: "hanging-coat",
      type: "image",
      depth: 0.45,
      gradient:
        "linear-gradient(160deg, #1a1520 0%, #2a2030 50%, #1a1520 100%)",
      position: { x: "72%", y: "18%", width: "14%", height: "42%" },
      animation: { type: "sway", duration: 8, intensity: 0.25, delay: 1 },
      opacity: 0.85,
    },
    {
      id: "fog-haze",
      type: "overlay",
      depth: 0.05,
      gradient:
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
      position: { x: "-10%", y: "40%", width: "120%", height: "30%" },
      animation: { type: "drift", duration: 24, intensity: 0.5 },
      opacity: 0.4,
      blendMode: "soft-light",
    },
  ],
  hotspots: [
    {
      id: "enter-studio",
      x: 38,
      y: 55,
      width: 24,
      height: 35,
      label: "Enter Studio",
      action: { type: "navigate", target: "design-studio" },
    },
    {
      id: "coat-detail",
      x: 72,
      y: 25,
      width: 12,
      height: 30,
      label: "Garment",
      action: { type: "reveal", label: "Prototype outerwear — unreleased" },
    },
  ],
  nextRoom: "design-studio",
  mobileFallback: { disableParallax: false },
  reducedMotionFallback: {
    disableParallax: true,
    disableParticles: true,
    disableAnimations: true,
  },
};
