import type { RoomConfig } from "../types";

export const photographyStudioRoom: RoomConfig = {
  id: "photography-studio",
  title: "Photography Studio",
  slug: "photography-studio",
  subtitle: "Capture Chamber",
  background:
    "linear-gradient(180deg, #08080a 0%, #101014 50%, #0a0a0e 100%)",
  lighting: {
    flashlight: false,
    intensity: 0.25,
    vignette: 0.58,
    ambientGlow: "rgba(255, 255, 255, 0.03)",
  },
  particles: { dust: 18, haze: 0.2 },
  entranceTransition: { type: "light-sweep", duration: 1 },
  exitTransition: { type: "fade", duration: 0.9 },
  layers: [
    {
      id: "backdrop",
      type: "image",
      depth: 0.15,
      gradient:
        "linear-gradient(180deg, #1a1a22 0%, #222230 60%, #1a1a22 100%)",
      position: { x: "25%", y: "15%", width: "50%", height: "65%" },
      animation: { type: "drift", duration: 20, intensity: 0.08 },
      opacity: 0.7,
    },
    {
      id: "smoke-drift",
      type: "overlay",
      depth: 0.35,
      gradient:
        "radial-gradient(ellipse 50% 40% at 50% 40%, rgba(255,255,255,0.04), transparent 70%)",
      position: { x: "20%", y: "25%", width: "60%", height: "50%" },
      animation: { type: "steam", duration: 18, intensity: 0.35, delay: 2 },
      opacity: 0.4,
      blendMode: "soft-light",
    },
    {
      id: "light-stand-reflection",
      type: "light",
      depth: 0.45,
      gradient:
        "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 30%)",
      position: { x: "12%", y: "30%", width: "4%", height: "50%" },
      animation: { type: "pulse", duration: 5, intensity: 0.3, delay: 1 },
      blendMode: "screen",
    },
    {
      id: "camera-flash",
      type: "light",
      depth: 0.5,
      gradient:
        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.55), transparent 55%)",
      position: { x: "65%", y: "32%", width: "14%", height: "14%" },
      animation: { type: "flash", duration: 10, intensity: 0.9, delay: 3 },
      blendMode: "screen",
      opacity: 0,
    },
    {
      id: "softbox-glow",
      type: "light",
      depth: 0.2,
      gradient:
        "radial-gradient(ellipse 40% 60% at 20% 40%, rgba(255,250,240,0.12), transparent 70%)",
      position: { x: "0%", y: "10%", width: "40%", height: "80%" },
      animation: { type: "pulse", duration: 6, intensity: 0.25 },
      blendMode: "screen",
    },
    {
      id: "tripod-shadow",
      type: "shadow",
      depth: 0.3,
      gradient:
        "radial-gradient(ellipse 20% 8% at 50% 50%, rgba(0,0,0,0.5), transparent 70%)",
      position: { x: "65%", y: "72%", width: "15%", height: "8%" },
      animation: { type: "drift", duration: 16, intensity: 0.15 },
    },
  ],
  hotspots: [
    {
      id: "to-archive",
      x: 45,
      y: 70,
      width: 20,
      height: 25,
      label: "Archive",
      action: { type: "navigate", target: "archive" },
    },
    {
      id: "lookbook-preview",
      x: 30,
      y: 20,
      width: 40,
      height: 55,
      label: "Lookbook",
      action: { type: "reveal", label: "NOVA — Exhibition 001 lookbook frames" },
    },
  ],
  prevRoom: "material-library",
  nextRoom: "archive",
  reducedMotionFallback: {
    disableParallax: true,
    disableParticles: true,
    disableAnimations: true,
  },
};
