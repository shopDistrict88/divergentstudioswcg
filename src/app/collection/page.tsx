"use client";

import { useState, useMemo } from "react";
import SectionHeading from "@/components/section-heading";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const types = ["All", "Hoodie", "Pants", "Accessory"] as const;
const tags = ["All", "LIMITED", "EXHIBITION 001", "NOVA"] as const;
const sorts = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

export default function CollectionPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [tagFilter, setTagFilter] = useState<string>("All");
  const [sort, setSort] = useState<string>("featured");

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "All") {
      result = result.filter((p) => p.type === typeFilter);
    }

    if (tagFilter !== "All") {
      result = result.filter((p) => p.tags.includes(tagFilter));
    }

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, typeFilter, tagFilter, sort]);

  return (
    <div className="section-spacing mx-auto max-w-7xl px-4 md:px-8">
      <SectionHeading
        title="Collection"
        subtitle="All pieces from EXHIBITION 001: NOVA"
      />

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] transition border ${
                typeFilter === t
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-white/15 text-white/60 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {sorts.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tag filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Badge
            key={t}
            variant={tagFilter === t ? "accent" : "default"}
            className="cursor-pointer"
            onClick={() => setTagFilter(t)}
          >
            {t}
          </Badge>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-white/50">
          No pieces match your filters.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
