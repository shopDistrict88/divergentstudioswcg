"use client";

import type { Product } from "@/lib/data";

export type ObjectStatus =
  | "AVAILABLE"
  | "LIMITED"
  | "CLOSED"
  | "UNRELEASED"
  | "ACCESS REQUIRED"
  | "ARCHIVED";

export function objectStatus(product: Product): ObjectStatus {
  if (product.status === "sold-out") return "CLOSED";
  if (product.status === "draft") return "UNRELEASED";
  if (product.tags?.some((t) => /access|private/i.test(t))) return "ACCESS REQUIRED";
  if (product.tags?.some((t) => /archive/i.test(t))) return "ARCHIVED";
  if (product.tags?.some((t) => /limited/i.test(t))) return "LIMITED";
  return "AVAILABLE";
}

export function objectCode(index: number): string {
  return String(index + 1).padStart(3, "0");
}
