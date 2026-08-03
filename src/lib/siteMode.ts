/**
 * Central release / site mode.
 * Control visibility from one place — do not scatter status logic.
 */

export type ReleaseMode =
  | "HIDDEN"
  | "TEASER"
  | "PRIVATE"
  | "OPEN"
  | "CLOSED"
  | "ARCHIVED";

/** @deprecated alias — prefer ReleaseMode */
export type SiteMode = ReleaseMode;

function normalizeMode(raw?: string): ReleaseMode {
  const v = (raw || "OPEN").toUpperCase();
  // Back-compat with previous mode names
  if (v === "PUBLIC_OPEN" || v === "PREVIEW") return "OPEN";
  if (v === "PRIVATE_ACCESS") return "PRIVATE";
  if (v === "LOCKED") return "HIDDEN";
  if (
    v === "HIDDEN" ||
    v === "TEASER" ||
    v === "PRIVATE" ||
    v === "OPEN" ||
    v === "CLOSED" ||
    v === "ARCHIVED"
  ) {
    return v;
  }
  return "OPEN";
}

export const RELEASE_MODE: ReleaseMode = normalizeMode(
  process.env.NEXT_PUBLIC_RELEASE_MODE || process.env.NEXT_PUBLIC_SITE_MODE
);

/** Back-compat for older imports */
export const SITE_MODE = RELEASE_MODE;


export function canBrowseShop(mode: ReleaseMode = RELEASE_MODE): boolean {
  return mode === "OPEN" || mode === "PRIVATE" || mode === "CLOSED" || mode === "ARCHIVED";
}

export function canPurchase(mode: ReleaseMode = RELEASE_MODE): boolean {
  return mode === "OPEN" || mode === "PRIVATE";
}

export function isLockedLanding(mode: ReleaseMode = RELEASE_MODE): boolean {
  return mode === "HIDDEN" || mode === "TEASER";
}

export function showShopLinks(mode: ReleaseMode = RELEASE_MODE): boolean {
  return mode !== "HIDDEN";
}

export function isTeaser(mode: ReleaseMode = RELEASE_MODE): boolean {
  return mode === "TEASER";
}
