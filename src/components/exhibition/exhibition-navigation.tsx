"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/cart-context";
import SoundControl from "./sound-control";

const NAV = [
  { href: "/exhibition/", label: "Exhibition" },
  { href: "/shop/", label: "Shop" },
  { href: "/archive/", label: "Archive" },
  { href: "/journal/", label: "Journal" },
  { href: "/philosophy/", label: "Philosophy" },
  { href: "/access/", label: "Access" },
] as const;

type ExhibitionNavigationProps = {
  hidden?: boolean;
};

export default function ExhibitionNavigation({
  hidden = false,
}: ExhibitionNavigationProps) {
  const pathname = usePathname();
  const { openCart, itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  if (hidden) return null;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-black focus:px-4 focus:py-2 focus:text-[10px] focus:uppercase focus:tracking-[0.3em] focus:text-white"
      >
        Skip to content
      </a>

      {/* Desktop edge labels */}
      <header className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
        <div className="pointer-events-auto absolute left-6 top-6 lg:left-10 lg:top-8">
          <Link
            href="/"
            className="font-display text-sm tracking-[0.2em] text-white/90 transition hover:text-white focus-ring"
          >
            Divergent Studios
          </Link>
        </div>

        <nav
          className="pointer-events-auto absolute right-6 top-6 flex flex-col items-end gap-3 lg:right-10 lg:top-8"
          aria-label="Exhibition"
        >
          {NAV.map((item) => {
            const active = pathname?.startsWith(item.href.replace(/\/$/, ""));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[10px] uppercase tracking-[0.35em] transition focus-ring ${
                  active ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={openCart}
            className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/40 transition hover:text-white/80 focus-ring"
            aria-label={`Bag${itemCount ? `, ${itemCount} items` : ""}`}
          >
            Bag{itemCount > 0 ? ` · ${itemCount}` : ""}
          </button>
          <div className="mt-3">
            <SoundControl />
          </div>
        </nav>
      </header>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-5 md:hidden">
        <Link
          href="/"
          className="font-display text-xs tracking-[0.18em] text-white/90 focus-ring"
        >
          Divergent Studios
        </Link>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openCart}
            className="text-[10px] uppercase tracking-[0.3em] text-white/50 focus-ring"
            aria-label="Open bag"
          >
            Bag{itemCount > 0 ? ` ${itemCount}` : ""}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="text-[10px] uppercase tracking-[0.3em] text-white/70 focus-ring"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-black md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <p className="font-display text-xs tracking-[0.18em] text-white/90">
                Divergent Studios
              </p>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-[10px] uppercase tracking-[0.3em] text-white/50 focus-ring"
              >
                Close
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-8 px-8">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl tracking-[0.08em] text-white/90 focus-ring"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/account/"
                onClick={() => setMenuOpen(false)}
                className="mt-4 text-[10px] uppercase tracking-[0.35em] text-white/40 focus-ring"
              >
                Account
              </Link>
              <div className="mt-6">
                <SoundControl />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
