"use client";

import { useEffect } from "react";
import Link from "next/link";
import { mobileNav, footerNav } from "@/data/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { showShopLinks } from "@/lib/siteMode";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const links = showShopLinks()
    ? mobileNav
    : [{ href: "/access/", label: "Access" }];

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-black px-4 pb-safe pt-16"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <nav className="flex flex-1 flex-col" aria-label="Mobile">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="border-b border-dirty-white/10 py-5 text-[clamp(1.15rem,5vw,1.6rem)] uppercase tracking-[0.14em] text-dirty-white/90 focus-ring"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 space-y-4">
        <p className="label-code text-dirty-white/35">
          {siteConfig.brand}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="label-util text-dirty-white/45 hover:text-dirty-white/80 focus-ring"
          >
            Instagram
          </a>
          {footerNav.legal.slice(0, 3).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="label-util text-dirty-white/45 hover:text-dirty-white/80 focus-ring"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            onClick={onClose}
            className="label-util text-dirty-white/45 hover:text-dirty-white/80 focus-ring"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
