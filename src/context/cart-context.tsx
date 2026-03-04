"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import type { Product } from "@/lib/data";

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; size: string } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; size: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; size: string; quantity: number } }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

const STORAGE_KEY = "divergent-cart";

/** Slim item for localStorage — no images to avoid QuotaExceededError */
type StoredCartItem = { productId: string; slug: string; name: string; price: number; quantity: number; size: string };

function toStored(items: CartItem[]): StoredCartItem[] {
  return items.map((i) => ({
    productId: i.product.id,
    slug: i.product.slug,
    name: i.product.name,
    price: i.product.price,
    quantity: i.quantity,
    size: i.size,
  }));
}

function fromStored(stored: StoredCartItem[]): CartItem[] {
  return stored.map((s) => ({
    product: {
      id: s.productId,
      slug: s.slug,
      name: s.name,
      price: s.price,
      description: "",
      details: { material: "", fit: "", weight: "", care: "" },
      images: [],
      exhibitionId: "",
      tags: [],
      type: "Hoodie",
    },
    quantity: s.quantity,
    size: s.size,
  }));
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.payload.product.id && i.size === action.payload.size
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.payload.product.id && i.size === action.payload.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          isOpen: true,
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload.product, quantity: 1, size: action.payload.size }],
        isOpen: true,
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.product.id === action.payload.productId && i.size === action.payload.size)
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.productId && i.size === action.payload.size
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        ),
      };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "HYDRATE":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) return;
        const items: CartItem[] = parsed.map((p: unknown) => {
          const x = p as Record<string, unknown>;
          if (x.productId != null) {
            return fromStored([x as StoredCartItem])[0];
          }
          const old = x as { product: Product; quantity: number; size: string };
          return {
            product: {
              id: old.product?.id ?? "",
              slug: old.product?.slug ?? "",
              name: old.product?.name ?? "",
              price: Number(old.product?.price) ?? 0,
              description: "",
              details: { material: "", fit: "", weight: "", care: "" },
              images: [],
              exhibitionId: "",
              tags: [],
              type: "Hoodie",
            },
            quantity: old.quantity ?? 1,
            size: old.size ?? "",
          };
        });
        dispatch({ type: "HYDRATE", payload: items });
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStored(state.items)));
    } catch (e) {
      if (e instanceof DOMException && e.name === "QuotaExceededError" && state.items.length > 0) {
        console.warn("[Cart] localStorage quota exceeded, clearing cart");
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
        dispatch({ type: "HYDRATE", payload: [] });
      }
    }
  }, [state.items]);

  const addItem = useCallback((product: Product, size: string) => {
    dispatch({ type: "ADD_ITEM", payload: { product, size } });
  }, []);

  const removeItem = useCallback((productId: string, size: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, size } });
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, size, quantity } });
  }, []);

  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_CART" }), []);

  const itemCount = state.items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = state.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        updateQuantity,
        openCart,
        closeCart,
        toggleCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
