import { supabase } from "./supabase";
import type { Exhibition, Product, JournalPost, ProductImage } from "./data";

function guard() {
  if (!supabase) return true;
  return false;
}

export async function fetchExhibitions(): Promise<Exhibition[]> {
  if (guard()) return [];
  const { data, error } = await supabase
    .from("exhibitions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Supabase] fetchExhibitions:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    meaning: row.meaning ?? "",
    statement: Array.isArray(row.statement) ? row.statement : [],
    year: row.year ?? "",
    status: row.status as Exhibition["status"],
    edition: row.edition ?? "",
  }));
}

function rowToProduct(row: Record<string, unknown>): Product {
  const details = (row.details as Record<string, string>) ?? {};
  const images = (row.images as unknown[]) ?? [];
  const tags = (row.tags as string[]) ?? [];

  const productImages: ProductImage[] = images.map((img: unknown, i: number) => {
    if (typeof img === "string") {
      return { id: `img-${i}`, alt: "", tone: "slate" as const, src: img };
    }
    const o = img as Record<string, string>;
    return {
      id: o.id ?? `img-${i}`,
      alt: o.alt ?? "",
      tone: (o.tone as ProductImage["tone"]) ?? "slate",
      src: o.src,
    };
  });

  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    price: Number(row.price),
    description: (row.description as string) ?? "",
    details: {
      material: details.material ?? "See product details",
      fit: details.fit ?? "One size",
      weight: details.weight ?? "",
      care: details.care ?? "See care instructions",
    },
    images: productImages.length > 0 ? productImages : [{ id: "img-1", alt: row.name as string, tone: "slate" }],
    exhibitionId: (row.exhibition_id as string) ?? "nova",
    tags,
    type: (row.type as Product["type"]) ?? "Hoodie",
    status: ((row.status as Product["status"]) ?? "active") as Product["status"],
    sizes: Array.isArray(row.sizes)
      ? (row.sizes as string[])
      : ["S", "M", "L", "XL"],
  };
}

export async function fetchProducts(status?: "active" | "draft" | "sold-out"): Promise<Product[]> {
  if (guard()) return [];
  let query = supabase.from("products").select("*").order("created_at", { ascending: false });
  if (status) {
    query = query.eq("status", status);
  }
  const { data, error } = await query;

  if (error) {
    console.error("[Supabase] fetchProducts:", error);
    return [];
  }

  return (data ?? []).map(rowToProduct);
}

export type AdminProductRow = {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  sizes: string[];
  type: string;
  status: string;
  images: string[];
  details?: Record<string, string>;
  exhibition_id?: string;
  tags?: string[];
};

export async function fetchAdminProducts(): Promise<AdminProductRow[]> {
  if (guard()) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Supabase] fetchAdminProducts:", error);
    return [];
  }

  return (data ?? []).map((row) => {
    const images = (row.images as unknown[]) ?? [];
    const imageStrings = images.map((img) =>
      typeof img === "string" ? img : (img as Record<string, string>)?.src ?? ""
    ).filter(Boolean);
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      price: Number(row.price),
      description: row.description ?? "",
      sizes: Array.isArray(row.sizes) ? row.sizes : ["S", "M", "L", "XL"],
      type: row.type ?? "Hoodie",
      status: row.status ?? "active",
      images: imageStrings,
      details: row.details as Record<string, string> | undefined,
      exhibition_id: row.exhibition_id,
      tags: Array.isArray(row.tags) ? row.tags : [],
    };
  });
}

export async function fetchJournalPosts(): Promise<JournalPost[]> {
  if (guard()) return [];
  const { data, error } = await supabase
    .from("journal_posts")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("[Supabase] fetchJournalPosts:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    date: row.date ?? "",
    readingTime: row.reading_time ?? "",
    tags: Array.isArray(row.tags) ? row.tags : [],
    body: row.body ?? "",
  }));
}

// Admin: upsert product
export async function upsertProduct(product: {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  sizes: string[];
  type: string;
  status: string;
  images: string[];
  details?: { material?: string; fit?: string; weight?: string; care?: string };
  exhibition_id?: string;
  tags?: string[];
}) {
  if (guard()) return { error: new Error("Supabase not configured") };
  const images = product.images.map((src, i) =>
    src ? { id: `img-${i}`, alt: product.name, tone: "slate" as const, src } : null
  ).filter(Boolean) as { id: string; alt: string; tone: string; src: string }[];

  const { error } = await supabase.from("products").upsert(
    {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      description: product.description,
      sizes: product.sizes,
      type: product.type,
      status: product.status,
      images: images.length > 0 ? images : [],
      details: product.details ?? {},
      exhibition_id: product.exhibition_id ?? "nova",
      tags: product.tags ?? [],
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );
  return { error };
}

// Admin: delete product
export async function deleteProduct(id: string) {
  if (guard()) return { error: new Error("Supabase not configured") };
  const { error } = await supabase.from("products").delete().eq("id", id);
  return { error };
}
