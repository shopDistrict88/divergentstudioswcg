"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { fetchOrderById, type Order } from "@/lib/orders-data";
import SectionHeading from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const STEPS = [
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "processing", label: "Processing", icon: Clock },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Package },
] as const;

const STATUS_ORDER = ["confirmed", "processing", "shipped", "delivered"];

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/account/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user || !orderId) return;
    fetchOrderById(orderId, user.id).then((data) => {
      setOrder(data);
      setLoading(false);
    });
  }, [user, orderId]);

  if (isLoading || loading) {
    return (
      <div className="section-spacing mx-auto max-w-3xl px-4 text-center text-white/50">
        Loading…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="section-spacing mx-auto max-w-3xl px-4 text-center">
        <p className="text-white/50 mb-6">Order not found.</p>
        <Button asChild variant="secondary">
          <Link href="/account">Back to Account</Link>
        </Button>
      </div>
    );
  }

  const currentStep = STATUS_ORDER.indexOf(order.status);

  const address = order.shipping_address;
  const addressText = address
    ? [address.line1, address.line2, [address.city, address.state, address.postal_code].filter(Boolean).join(", "), address.country]
        .filter(Boolean)
        .join("\n")
    : "No shipping address on file";

  return (
    <div className="section-spacing mx-auto max-w-3xl px-4 md:px-8">
      <Button asChild variant="secondary" size="sm" className="mb-6">
        <Link href="/account">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Link>
      </Button>

      <SectionHeading
        title={`Order #${order.id.slice(0, 8).toUpperCase()}`}
        subtitle={new Date(order.created_at).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      />

      <div className="mt-8 surface-card rounded-2xl p-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 mb-6">
          Order Status
        </p>
        <div className="flex justify-between">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const active = i <= currentStep;
            return (
              <div key={step.key} className="flex flex-1 flex-col items-center text-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                    active
                      ? "border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]"
                      : "border-white/10 text-white/30"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <p className={`mt-2 text-[9px] uppercase tracking-wider ${active ? "text-white" : "text-white/30"}`}>
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>

        {order.tracking_number && (
          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-[10px] uppercase tracking-wider text-white/50">Tracking</p>
            <p className="mt-1 text-sm font-medium text-white">
              {order.carrier ? `${order.carrier}: ` : ""}{order.tracking_number}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="surface-card rounded-2xl p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Ship To</p>
          <p className="mt-3 whitespace-pre-line text-sm text-white/80">{addressText}</p>
        </div>
        <div className="surface-card rounded-2xl p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Contact</p>
          <p className="mt-3 text-sm text-white/80">{order.email}</p>
        </div>
      </div>

      <div className="mt-6 surface-card rounded-2xl p-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 mb-4">Items</p>
        <div className="space-y-3">
          {(order.items ?? []).map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div>
                <p className="font-medium text-white">{item.product_name}</p>
                <p className="text-[10px] text-white/50 uppercase tracking-wide">
                  Size {item.size} × {item.quantity}
                </p>
              </div>
              <p className="text-white/80">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
