"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/context/products-context";
import { objectCode } from "@/lib/objectStatus";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ open, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { products } = useProducts();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  const q = query.trim().toLowerCase();
  const results = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-[80] bg-[#080808] px-4 pt-16 md:px-8"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <p className="label-code text-dirty-white/50">Search</p>
          <button
            type="button"
            onClick={onClose}
            className="label-util text-dirty-white/50 focus-ring"
          >
            Close
          </button>
        </div>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="—"
          className="mt-8 w-full border-b border-dirty-white/25 bg-transparent py-3 text-lg uppercase tracking-[0.12em] text-dirty-white outline-none placeholder:text-dirty-white/20"
          aria-label="Search objects"
        />

        <div className="mt-10">
          <p className="label-code text-dirty-white/35">Objects</p>
          {q && results.length === 0 ? (
            <p className="mt-4 label-util text-dirty-white/40">
              Nothing held
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {results.map((p, i) => (
                <li key={p.id}>
                  <Link
                    href={`/object/${p.slug}/`}
                    onClick={onClose}
                    className="flex items-baseline justify-between gap-4 border-b border-dirty-white/10 py-3 focus-ring"
                  >
                    <span className="label-code text-dirty-white/40">
                      Object {objectCode(i)}
                    </span>
                    <span className="text-[12px] uppercase tracking-[0.14em] text-dirty-white/85">
                      {p.name}
                    </span>
                    <span className="label-code text-dirty-white/40">
                      ${p.price}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
