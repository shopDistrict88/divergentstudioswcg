/**
 * Current release — Exhibition 001 / NOVA
 * Coded labels only. No marketing copy.
 */

export const releaseConfig = {
  id: "001",
  code: "NOVA",
  year: "2026",
  statusLabel: "OPEN",
  restock: "UNCONFIRMED",
  window: "UNCONFIRMED",
  documented: "2026",
  path: "/collections/nova/",
  shopPath: "/collections/",
  media: {
    poster: "/media/divergent-entrance-poster.jpg",
    film: "/media/divergent-entrance.mp4",
    filmMobile: "/media/divergent-entrance-mobile.mp4",
    lanyardFront: "/lanyard/card-front.png",
    lanyardBack: "/lanyard/card-back.png",
  },
} as const;

export const siteConfig = {
  brand: "Divergent Studios",
  release: releaseConfig,
  social: {
    instagram: "https://instagram.com/",
  },
} as const;
