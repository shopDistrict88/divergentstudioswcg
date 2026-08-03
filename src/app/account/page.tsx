"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { fetchUserOrders, type Order } from "@/lib/orders-data";
import SectionHeading from "@/components/section-heading";
import { Button } from "@/components/ui/button";

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Order Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
};

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-blue-500/20 text-blue-400",
  processing: "bg-yellow-500/20 text-yellow-400",
  shipped: "bg-purple-500/20 text-purple-400",
  delivered: "bg-green-500/20 text-green-400",
};

export default function AccountPage() {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/account/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    fetchUserOrders(user.id).then((data) => {
      setOrders(data);
      setLoadingOrders(false);
    });
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="section-spacing mx-auto max-w-3xl px-4 text-center text-white/50">
        Loading…
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="section-spacing mx-auto max-w-3xl px-4 md:px-8">
      <div className="mb-8 flex items-start justify-between">
        <SectionHeading
          title="My Account"
          subtitle={user.email ?? ""}
        />
        <Button variant="secondary" size="sm" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </div>

      <div className="mb-10 surface-card rounded-2xl p-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Profile</p>
        <p className="mt-2 text-sm text-white">
          {user.user_metadata?.full_name || "Collector"}
        </p>
        <p className="text-xs text-white/50">{user.email}</p>
      </div>

      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
        Order History
      </h2>

      {loadingOrders ? (
        <p className="text-sm text-white/50">Loading orders…</p>
      ) : orders.length === 0 ? (
        <div className="surface-card rounded-2xl p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-white/20" />
          <p className="mt-4 text-sm text-white/50">No orders yet</p>
          <Button asChild className="mt-6">
            <Link href="/shop/">Shop Artifacts</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="flex items-center justify-between surface-card rounded-xl p-4 transition hover:border-white/20"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white">
                  Order #{order.id.slice(0, 8).toUpperCase()}
                </p>
                <p className="mt-1 text-[10px] text-white/50">
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {" · "}${order.total.toFixed(2)}
                  {" · "}{(order.items?.length ?? 0)} item{(order.items?.length ?? 0) !== 1 ? "s" : ""}
                </p>
                <span
                  className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider ${
                    STATUS_COLORS[order.status] ?? "bg-white/10 text-white/60"
                  }`}
                >
                  {STATUS_LABELS[order.status] ?? order.status}
                </span>
              </div>
              <ChevronRight className="h-5 w-5 text-white/30" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
