import { supabase } from "./supabase";

export type OrderStatus = "confirmed" | "processing" | "shipped" | "delivered";

export type OrderItem = {
  id: string;
  product_name: string;
  size: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  stripe_session_id: string;
  email: string;
  status: OrderStatus;
  total: number;
  shipping_address: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  } | null;
  tracking_number: string | null;
  carrier: string | null;
  created_at: string;
  items?: OrderItem[];
};

export async function fetchUserOrders(userId: string): Promise<Order[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[orders] fetchUserOrders:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    stripe_session_id: row.stripe_session_id,
    email: row.email,
    status: row.status as OrderStatus,
    total: Number(row.total),
    shipping_address: row.shipping_address,
    tracking_number: row.tracking_number,
    carrier: row.carrier,
    created_at: row.created_at,
    items: (row.order_items ?? []).map((item: OrderItem & { id: string }) => ({
      id: item.id,
      product_name: item.product_name,
      size: item.size,
      quantity: item.quantity,
      price: Number(item.price),
    })),
  }));
}

export async function fetchOrderById(orderId: string, userId: string): Promise<Order | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", orderId)
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    stripe_session_id: data.stripe_session_id,
    email: data.email,
    status: data.status as OrderStatus,
    total: Number(data.total),
    shipping_address: data.shipping_address,
    tracking_number: data.tracking_number,
    carrier: data.carrier,
    created_at: data.created_at,
    items: (data.order_items ?? []).map((item: OrderItem & { id: string }) => ({
      id: item.id,
      product_name: item.product_name,
      size: item.size,
      quantity: item.quantity,
      price: Number(item.price),
    })),
  };
}
