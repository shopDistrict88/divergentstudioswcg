"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/data/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { showShopLinks } from "@/lib/siteMode";
import { useCart } from "@/context/cart-context";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";

export default function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const shopOk = showShopLinks();
  const bagLabel = String(itemCount).padStart(2, "0");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "header-blur border-b border-dirty-white/5"
            : "bg-black/45"
        }`}
      >
        <div className="mx-auto grid h-14 max-w-[1600px] grid-cols-[1fr_auto] items-center gap-4 px-4 md:grid-cols-[1fr_auto_1fr] md:px-6">
          <Link
            href="/"
            className="label-util shrink-0 text-dirty-white focus-ring"
          >
            {siteConfig.brand}
          </Link>

          {shopOk && (
            <nav
              className="hidden items-center gap-6 md:flex"
              aria-label="Primary"
            >
              {primaryNav.map((link) => {
                const active =
                  pathname === link.href ||
                  pathname?.startsWith(link.href.replace(/\/$/, ""));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-active={active}
                    className="link-nav focus-ring"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}

          <div className="flex items-center justify-end gap-5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="link-nav hidden focus-ring md:inline"
            >
              Search
            </button>
            <button
              type="button"
              onClick={openCart}
              className="link-nav focus-ring"
              aria-label={`Cart, ${itemCount} items`}
            >
              Cart {bagLabel}
            </button>
            <button
              type="button"
              className="link-nav focus-ring md:hidden"
              aria-label={menuOpen ? "Close menu" : "Menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
