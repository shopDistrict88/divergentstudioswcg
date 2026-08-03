export type NavLink = {
  href: string;
  label: string;
};

/** Primary nav — cinematic IA */
export const primaryNav: NavLink[] = [
  { href: "/shop/", label: "Collection" },
  { href: "/campaign/", label: "Campaign" },
  { href: "/archive/", label: "Archive" },
  { href: "/record/", label: "Journal" },
  { href: "/info/", label: "About" },
];

export const mobileNav: NavLink[] = [
  { href: "/shop/", label: "Collection" },
  { href: "/campaign/", label: "Campaign" },
  { href: "/archive/", label: "Archive" },
  { href: "/record/", label: "Journal" },
  { href: "/info/", label: "About" },
  { href: "/001/", label: "001 — NOVA" },
  { href: "/access/", label: "Access" },
  { href: "/track/", label: "Track" },
];

export const footerNav = {
  primary: [
    { href: "/shop/", label: "Collection" },
    { href: "/campaign/", label: "Campaign" },
    { href: "/archive/", label: "Archive" },
    { href: "/record/", label: "Journal" },
    { href: "/access/", label: "Access" },
  ],
  legal: [
    { href: "/shipping/", label: "Shipping" },
    { href: "/returns/", label: "Returns" },
    { href: "/privacy/", label: "Privacy" },
    { href: "/terms/", label: "Terms" },
  ],
} as const;
