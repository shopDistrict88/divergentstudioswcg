"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/exhibitions/nova", label: "Exhibition" },
  { href: "/collection", label: "Collection" },
  { href: "/archive", label: "Archive" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const { toggleCart, itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-[70]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between border-b border-white/5 bg-black/90 px-4 backdrop-blur-xl md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.4em] text-white"
        >
          Divergent Studios
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            aria-label="Open cart"
            className="relative rounded-full border border-white/10 p-2 text-white/80 transition hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[9px] font-bold">
                {itemCount}
              </span>
            )}
          </button>

          {/* Studio Mode indicator */}
          <span className="hidden items-center gap-2 text-[9px] font-medium uppercase tracking-[0.25em] text-white/50 md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            Studio Mode
          </span>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 top-16 z-[60] flex flex-col gap-6 bg-black px-6 py-8 md:hidden overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium uppercase tracking-[0.2em] text-white/80 active:text-white py-2"
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
