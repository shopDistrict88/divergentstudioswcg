"use client";

import { useEffect } from "react";
import Link from "next/link";
import { mobileNav, footerNav } from "@/data/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { releaseConfig } from "@/lib/releaseConfig";
import { studioConfig } from "@/lib/studioConfig";
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
      className="fixed inset-0 z-[70] flex flex-col bg-[#050505] px-6 pb-safe pt-20"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <p className="label-code text-dirty-white/25">RESTRICTED DIRECTORY</p>

      <nav className="mt-10 flex flex-1 flex-col" aria-label="Mobile">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="border-b border-dirty-white/10 py-6 text-[clamp(1.25rem,6vw,2rem)] uppercase tracking-[0.12em] text-[#E8E6E1] focus-ring"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto space-y-6 border-t border-dirty-white/10 pt-8">
        <div>
          <p className="label-code text-dirty-white/35">CURRENT EXHIBITION</p>
          <p className="label-code mt-2 text-dirty-white/70">
            {releaseConfig.id} — {releaseConfig.code}
          </p>
        </div>
        <div>
          <p className="label-code text-dirty-white/35">LATEST JOURNAL FILE</p>
          <p className="label-code mt-2 text-dirty-white/70">
            {studioConfig.status.items[3]?.value ?? "—"}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="label-util text-dirty-white/45 hover:text-dirty-white/80 focus-ring"
          >
            Instagram
          </a>
          {footerNav.legal.slice(0, 2).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="label-util text-dirty-white/45 hover:text-dirty-white/80 focus-ring"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
