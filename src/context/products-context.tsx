"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { fetchProducts, fetchAdminProducts, upsertProduct, deleteProduct } from "@/lib/supabase-data";
import type { Product } from "@/lib/data";

export type AdminProduct = {
  id: string;
  name: string;
  slug?: string;
  price: number;
  description: string;
  sizes: string[];
  type?: "Hoodie" | "Pants" | "Accessory";
  status: "active" | "draft" | "sold-out";
  exhibitionId?: string;
  tags?: string[];
  images?: string[];
  details?: { material?: string; fit?: string; weight?: string; care?: string };
};

function rowToAdminProduct(row: { id: string; name: string; slug: string; price: number; description: string; sizes: string[]; type: string; status: string; images: string[]; details?: Record<string, string>; exhibition_id?: string; tags?: string[] }): AdminProduct {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    price: row.price,
    description: row.description,
    sizes: row.sizes ?? ["S", "M", "L", "XL"],
    type: row.type as AdminProduct["type"],
    status: row.status as AdminProduct["status"],
    exhibitionId: row.exhibition_id,
    tags: row.tags,
    images: row.images ?? [],
    details: row.details,
  };
}

type ProductsContextType = {
  products: Product[];
  adminProducts: AdminProduct[];
  isLoading: boolean;
  setAdminProducts: (products: AdminProduct[]) => void;
  saveProduct: (product: AdminProduct) => Promise<{ error: Error | null }>;
  removeProduct: (id: string) => Promise<{ error: Error | null }>;
  refresh: () => void;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [adminProducts, setAdminProductsState] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    // Public storefront only needs active products — skip admin fetch on cold start
    const storeProducts = await fetchProducts("active");
    setProducts(storeProducts);
    setIsLoading(false);

    // Admin catalog loads later — keeps entrance bandwidth free
    window.setTimeout(() => {
      void (async () => {
        try {
          const adminRows = await fetchAdminProducts();
          setAdminProductsState(adminRows.map(rowToAdminProduct));
        } catch {
          /* non-critical */
        }
      })();
    }, 2500);
  }, []);

  useEffect(() => {
    // Defer catalog fetch so entrance film gets the connection first
    const t = window.setTimeout(() => {
      void load();
    }, 900);
    return () => window.clearTimeout(t);
  }, [load]);

  const setAdminProducts = useCallback((list: AdminProduct[]) => {
    setAdminProductsState(list);
  }, []);

  const saveProduct = useCallback(async (product: AdminProduct) => {
    const sizes = product.sizes?.length ? product.sizes : ["S", "M", "L", "XL"];
    const images = Array.isArray(product.images) ? product.images : [];
    const { error } = await upsertProduct({
      id: product.id,
      name: product.name,
      slug: product.slug || product.id,
      price: product.price,
      description: product.description ?? "",
      sizes,
      type: product.type ?? "Hoodie",
      status: product.status ?? "active",
      images,
      details: product.details,
      exhibition_id: product.exhibitionId,
      tags: product.tags,
    });
    if (!error) await load();
    return { error: error ?? null };
  }, [load]);

  const removeProduct = useCallback(async (id: string) => {
    const { error } = await deleteProduct(id);
    if (!error) await load();
    return { error: error ?? null };
  }, [load]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        adminProducts,
        isLoading,
        setAdminProducts,
        saveProduct,
        removeProduct,
        refresh: load,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
