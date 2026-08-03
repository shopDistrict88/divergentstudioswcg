"use client";

import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { studioConfig } from "@/lib/studioConfig";

export default function SiteFooter() {
  const { footer } = studioConfig;

  return (
    <footer className="border-t border-dirty-white/10 bg-[#050505]">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="label-util text-[#E8E6E1]">DIVERGENT STUDIOS®</p>
            <p className="label-code mt-4 text-dirty-white/35">{footer.tagline}</p>
            <p className="label-code mt-2 text-dirty-white/35">
              {studioConfig.location.toUpperCase()}
            </p>
            <p className="label-code mt-2 text-dirty-white/25">
              ESTABLISHED {studioConfig.established}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {footerNav.primary.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label-util w-fit text-dirty-white/50 hover:text-dirty-white/85 focus-ring"
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="label-util w-fit text-dirty-white/50 hover:text-dirty-white/85 focus-ring"
            >
              INSTAGRAM
            </a>
            {footerNav.legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label-util w-fit text-dirty-white/40 hover:text-dirty-white/75 focus-ring"
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-dirty-white/10 pt-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <p className="label-code text-dirty-white/30">
              CURRENT EXHIBITION: {footer.currentExhibition}
            </p>
            <p className="label-code text-dirty-white/30">
              STUDIO STATUS: {footer.studioStatus} · ORDERS: {footer.orders}
            </p>
          </div>
          <p className="label-code text-dirty-white/25">
            © DIVERGENT STUDIOS · ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
