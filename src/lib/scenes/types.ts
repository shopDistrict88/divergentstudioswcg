export type SceneAnimationType =
  | "float"
  | "sway"
  | "pulse"
  | "flicker"
  | "flash"
  | "drift"
  | "rotate"
  | "steam"
  | "scan"
  | "none";

export type SceneLayerType =
  | "image"
  | "video"
  | "light"
  | "particle"
  | "overlay"
  | "shadow";

export type SceneLayerPosition = {
  x: string;
  y: string;
  width: string;
  height: string;
};

export type SceneAnimation = {
  type: SceneAnimationType;
  duration?: number;
  intensity?: number;
  delay?: number;
};

export type SceneLayer = {
  id: string;
  type: SceneLayerType;
  src?: string;
  gradient?: string;
  depth: number;
  opacity?: number;
  blendMode?: string;
  position?: SceneLayerPosition;
  animation?: SceneAnimation;
  zIndex?: number;
  linkedHotspotId?: string;
};

export type SceneHotspotAction = {
  type: "navigate" | "reveal" | "external";
  target?: string;
  label?: string;
};

export type SceneHotspot = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  action: SceneHotspotAction;
  revealOnHover?: boolean;
};

export type SceneTransitionType =
  | "fade"
  | "blur"
  | "scale"
  | "light-sweep";

export type SceneTransition = {
  type: SceneTransitionType;
  duration: number;
};

export type RoomLighting = {
  flashlight?: boolean;
  intensity?: number;
  color?: string;
  vignette?: number;
  ambientGlow?: string;
};

export type RoomParticles = {
  dust?: number;
  haze?: number;
};

export type RoomFallback = {
  simplifiedLayerIds?: string[];
  disableParallax?: boolean;
  disableParticles?: boolean;
  disableAnimations?: boolean;
};

export type RoomConfig = {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  /** CSS gradient or image path (`/scenes/...`) */
  background: string;
  /**
   * Layered scene pieces. Depth drives both z-order and parallax:
   * ~0.05–0.2 background, ~0.3–0.55 midground, ~0.6–0.9 foreground.
   */
  layers: SceneLayer[];
  hotspots: SceneHotspot[];
  ambientAudio?: string;
  entranceTransition?: SceneTransition;
  exitTransition?: SceneTransition;
  lighting: RoomLighting;
  particles?: RoomParticles;
  mobileFallback?: RoomFallback;
  reducedMotionFallback?: RoomFallback;
  nextRoom?: string;
  prevRoom?: string;
};
