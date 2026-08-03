import type { RoomConfig } from "../types";

export const vaultRoom: RoomConfig = {
  id: "vault",
  title: "Vault",
  slug: "vault",
  subtitle: "Restricted Access",
  background:
    "linear-gradient(180deg, #040406 0%, #08080c 50%, #040406 100%)",
  lighting: {
    flashlight: true,
    intensity: 0.45,
    color: "rgba(200, 210, 255, 0.1)",
    vignette: 0.7,
    ambientGlow: "rgba(189, 22, 64, 0.03)",
  },
  particles: { dust: 20, haze: 0.1 },
  entranceTransition: { type: "fade", duration: 1.4 },
  exitTransition: { type: "fade", duration: 1 },
  layers: [
    {
      id: "vault-door",
      type: "image",
      depth: 0.2,
      gradient:
        "linear-gradient(145deg, #12141a 0%, #1a1e28 40%, #12141a 100%)",
      position: { x: "30%", y: "15%", width: "40%", height: "70%" },
      opacity: 0.85,
    },
    {
      id: "security-scan",
      type: "light",
      depth: 0.25,
      gradient:
        "linear-gradient(90deg, transparent, rgba(189, 22, 64, 0.15), transparent)",
      position: { x: "28%", y: "20%", width: "44%", height: "3%" },
      animation: { type: "scan", duration: 8, intensity: 0.6, delay: 0 },
      blendMode: "screen",
    },
    {
      id: "door-status-light",
      type: "light",
      depth: 0.45,
      gradient:
        "radial-gradient(circle at 50% 50%, rgba(189, 22, 64, 0.6), transparent 60%)",
      position: { x: "62%", y: "42%", width: "3%", height: "3%" },
      animation: { type: "flicker", duration: 0.3, intensity: 0.4, delay: 0 },
      blendMode: "screen",
    },
    {
      id: "hidden-artifact",
      type: "image",
      depth: 0.6,
      gradient:
        "linear-gradient(135deg, #2a1520 0%, #4a2030 50%, #2a1520 100%)",
      position: { x: "38%", y: "40%", width: "24%", height: "30%" },
      opacity: 0,
      linkedHotspotId: "vault-artifact",
      animation: { type: "pulse", duration: 6, intensity: 0.2 },
    },
    {
      id: "floor-reflection",
      type: "overlay",
      depth: 0.1,
      gradient:
        "linear-gradient(0deg, rgba(189, 22, 64, 0.04) 0%, transparent 20%)",
      position: { x: "0%", y: "75%", width: "100%", height: "25%" },
      opacity: 0.5,
    },
    {
      id: "deep-shadow",
      type: "shadow",
      depth: 0.08,
      gradient:
        "radial-gradient(ellipse 50% 30% at 50% 80%, rgba(0,0,0,0.7), transparent 70%)",
      position: { x: "0%", y: "60%", width: "100%", height: "40%" },
      animation: { type: "drift", duration: 25, intensity: 0.2 },
    },
  ],
  hotspots: [
    {
      id: "vault-artifact",
      x: 38,
      y: 40,
      width: 24,
      height: 30,
      label: "Classified Piece",
      action: { type: "reveal", label: "NOVA Prototype — 1 of 1" },
      revealOnHover: true,
    },
    {
      id: "exit-entrance",
      x: 5,
      y: 80,
      width: 15,
      height: 15,
      label: "Exit",
      action: { type: "navigate", target: "entrance" },
    },
  ],
  prevRoom: "archive",
  nextRoom: "entrance",
  reducedMotionFallback: {
    disableParallax: true,
    disableParticles: true,
    disableAnimations: true,
  },
};
