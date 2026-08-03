import type { RoomConfig } from "../types";

/** Temporary test room — gradient placeholders until final scene images are uploaded. */
export const placeholderRoom: RoomConfig = {
  id: "placeholder",
  title: "Test Chamber",
  slug: "placeholder",
  subtitle: "Living Scene Demo",
  background:
    "linear-gradient(145deg, #0a0810 0%, #1a1020 30%, #201528 60%, #0e0a12 100%)",
  lighting: {
    flashlight: true,
    intensity: 0.4,
    color: "rgba(255, 240, 220, 0.12)",
    vignette: 0.5,
    ambientGlow: "rgba(189, 22, 64, 0.08)",
  },
  particles: { dust: 40, haze: 0.2 },
  entranceTransition: { type: "scale", duration: 1 },
  exitTransition: { type: "blur", duration: 0.8 },
  layers: [
    {
      id: "bg-glow",
      type: "light",
      depth: 0.05,
      gradient:
        "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(189, 22, 64, 0.12), transparent 70%)",
      position: { x: "0%", y: "0%", width: "100%", height: "100%" },
      animation: { type: "pulse", duration: 8, intensity: 0.3 },
      blendMode: "screen",
    },
    {
      id: "mid-object-a",
      type: "image",
      depth: 0.4,
      gradient:
        "linear-gradient(160deg, #2a1a30 0%, #4a2848 50%, #2a1a30 100%)",
      position: { x: "20%", y: "35%", width: "25%", height: "35%" },
      animation: { type: "sway", duration: 9, intensity: 0.3, delay: 0 },
      opacity: 0.8,
    },
    {
      id: "mid-object-b",
      type: "image",
      depth: 0.45,
      gradient:
        "linear-gradient(200deg, #1a2030 0%, #2a3550 50%, #1a2030 100%)",
      position: { x: "55%", y: "30%", width: "28%", height: "40%" },
      animation: { type: "float", duration: 11, intensity: 0.2, delay: 1.5 },
      opacity: 0.75,
    },
    {
      id: "fg-element",
      type: "image",
      depth: 0.7,
      gradient:
        "linear-gradient(170deg, #302030 0%, #503050 40%, #302030 100%)",
      position: { x: "40%", y: "55%", width: "20%", height: "30%" },
      animation: { type: "sway", duration: 7, intensity: 0.35, delay: 0.5 },
      opacity: 0.85,
    },
    {
      id: "fog-layer",
      type: "overlay",
      depth: 0.12,
      gradient:
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
      position: { x: "-15%", y: "50%", width: "130%", height: "25%" },
      animation: { type: "drift", duration: 20, intensity: 0.5 },
      opacity: 0.35,
      blendMode: "soft-light",
    },
    {
      id: "light-accent",
      type: "light",
      depth: 0.3,
      gradient:
        "radial-gradient(circle at 50% 50%, rgba(255, 200, 120, 0.25), transparent 60%)",
      position: { x: "70%", y: "20%", width: "15%", height: "15%" },
      animation: { type: "flicker", duration: 0.15, intensity: 0.5, delay: 2 },
      blendMode: "screen",
    },
    {
      id: "cast-shadow",
      type: "shadow",
      depth: 0.15,
      gradient:
        "radial-gradient(ellipse 40% 15% at 50% 50%, rgba(0,0,0,0.5), transparent 70%)",
      position: { x: "35%", y: "78%", width: "30%", height: "12%" },
      animation: { type: "drift", duration: 18, intensity: 0.25 },
    },
  ],
  hotspots: [
    {
      id: "nav-entrance",
      x: 10,
      y: 10,
      width: 20,
      height: 15,
      label: "→ Entrance",
      action: { type: "navigate", target: "entrance" },
    },
    {
      id: "reveal-test",
      x: 42,
      y: 58,
      width: 16,
      height: 22,
      label: "Inspect",
      action: { type: "reveal", label: "Placeholder artifact — replace with final asset" },
    },
  ],
  nextRoom: "entrance",
  reducedMotionFallback: {
    disableParallax: true,
    disableParticles: true,
    disableAnimations: true,
  },
};
