/**
 * Divergent Studios — Entrance
 * Short barrier: black → mark → film → 001 / NOVA → ENTER / SKIP
 */

export type EntranceTextAlign = "left" | "center" | "right";

export type EntranceConfig = {
  filmEnabled: boolean;
  entranceVideoSrc: string;
  entranceVideoSrcMobile?: string;
  entranceVideoSrcWebm?: string;
  entrancePosterSrc?: string;

  identityRevealSecondsBeforeEnd: number;
  skipRevealDelayMs: number;

  blackHoldMs: number;
  minLoaderDurationMs: number;
  loaderCompleteHoldMs: number;
  loaderTransitionMs: number;
  readyTimeoutMs: number;
  loadingLineWidthDesktop: number;
  loadingLineWidthMobile: number;
  filmGrainIntensity: number;

  transitionDurationMs: number;
  soundFadeMs: number;
  soundMaxVolume: number;
  progressIndicatorEnabled: boolean;
  textAlign: EntranceTextAlign;
  textPositionY: number;
  objectPositionDesktop: string;
  objectPositionMobile: string;
  sessionStorageKey: string;
  replayQueryParam: string;
  destinationRoute: string;
  handoffMode: "reveal" | "navigate";
};

export const entranceConfig: EntranceConfig = {
  filmEnabled: true,
  entranceVideoSrc: "/media/divergent-entrance.mp4?v=street1",
  entranceVideoSrcMobile: "/media/divergent-entrance-mobile.mp4?v=street1",
  entrancePosterSrc: "/media/divergent-entrance-poster.jpg?v=street1",

  identityRevealSecondsBeforeEnd: 2.5,
  skipRevealDelayMs: 3500,

  blackHoldMs: 280,
  minLoaderDurationMs: 420,
  loaderCompleteHoldMs: 80,
  loaderTransitionMs: 450,
  readyTimeoutMs: 7000,
  loadingLineWidthDesktop: 120,
  loadingLineWidthMobile: 96,
  filmGrainIntensity: 0.18,

  transitionDurationMs: 700,
  soundFadeMs: 400,
  soundMaxVolume: 0.45,
  progressIndicatorEnabled: false,
  textAlign: "center",
  textPositionY: 52,
  objectPositionDesktop: "center center",
  objectPositionMobile: "50% center",
  sessionStorageKey: "divergentEntranceCompleted",
  replayQueryParam: "replayEntrance",
  destinationRoute: "/",
  handoffMode: "reveal",
};
