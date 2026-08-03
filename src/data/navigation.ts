export type NavLink = {
  href: string;
  label: string;
};

/** Primary nav — studio IA */
export const primaryNav: NavLink[] = [
  { href: "/collections/", label: "Collections" },
  { href: "/archive/", label: "Archive" },
  { href: "/journal/", label: "Journal" },
  { href: "/studio/", label: "Studio" },
];

export const mobileNav: NavLink[] = [
  { href: "/collections/", label: "Collections" },
  { href: "/archive/", label: "Archive" },
  { href: "/journal/", label: "Journal" },
  { href: "/studio/", label: "Studio" },
];

export const footerNav = {
  primary: [
    { href: "/collections/", label: "Collections" },
    { href: "/archive/", label: "Archive" },
    { href: "/journal/", label: "Journal" },
    { href: "/studio/", label: "Studio" },
    { href: "/contact/", label: "Contact" },
  ],
  legal: [
    { href: "/shipping/", label: "Shipping" },
    { href: "/returns/", label: "Returns" },
    { href: "/terms/", label: "Terms" },
    { href: "/privacy/", label: "Privacy" },
  ],
} as const;
