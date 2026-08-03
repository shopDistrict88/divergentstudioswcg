"use client";

import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { siteConfig } from "@/lib/siteConfig";

export default function SiteFooter() {
  const { release } = siteConfig;

  return (
    <footer className="border-t border-dirty-white/10 bg-[#080808]">
      <div className="mx-auto max-w-[1600px] px-4 py-12 md:px-6 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="label-util text-dirty-white/90">
              {siteConfig.brand}
            </p>
            <p className="label-code mt-3 text-dirty-white/35">
              {release.id} / {release.code} / {release.year}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {footerNav.primary.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label-util text-dirty-white/50 hover:text-dirty-white/85 focus-ring"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="label-util text-dirty-white/50 hover:text-dirty-white/85 focus-ring"
            >
              Instagram
            </a>
            {footerNav.legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label-util text-dirty-white/40 hover:text-dirty-white/75 focus-ring"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
