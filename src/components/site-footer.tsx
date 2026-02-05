import Link from "next/link";
import { Instagram, Twitter, Lock } from "lucide-react";

const footerLinks = [
  {
    title: "Exhibitions",
    links: [
      { href: "/exhibitions/nova", label: "NOVA" },
      { href: "/archive", label: "Archive" },
    ],
  },
  {
    title: "Shop",
    links: [
      { href: "/collection", label: "Collection" },
      { href: "/cart", label: "Cart" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/journal", label: "Journal" },
      { href: "/contact", label: "Contact" },
      { href: "/studio-pass", label: "Studio Pass" },
    ],
  },
  {
    title: "Info",
    links: [
      { href: "/shipping", label: "Shipping & Returns" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-5 md:px-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white mb-4">
            Divergent Studios
          </p>
          <p className="text-xs leading-relaxed text-white/50">
            Wearable art.<br />Limited exhibitions.
          </p>
          <div className="mt-6 flex gap-4 text-white/50">
            <a href="#" aria-label="Instagram" className="hover:text-white transition">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Link columns */}
        {footerLinks.map((group) => (
          <div key={group.title}>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
              {group.title}
            </p>
            <ul className="space-y-2">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs text-white/50 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 py-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
          © 2026 Divergent Studios. All rights reserved.
        </p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-white/20">
          Built by Wilson Collective Group LLC
        </p>
        <Link
          href="/studio-admin/login"
          className="mt-4 inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] text-white/15 transition hover:text-white/40"
        >
          <Lock className="h-3 w-3" />
          Admin
        </Link>
      </div>
    </footer>
  );
}
