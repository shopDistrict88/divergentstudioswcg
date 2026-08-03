"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function TrackPage() {
  const { user, isLoading } = useAuth();

  return (
    <div className="mx-auto min-h-[60vh] max-w-lg px-4 pb-24 pt-20 md:px-6">
      <p className="label-code text-dirty-white/40">Orders</p>
      <h1 className="mt-3 text-[clamp(1.5rem,4vw,2rem)] uppercase tracking-[0.12em] text-dirty-white/90">
        Track Order
      </h1>
      <p className="body-tight mt-5">
        Sign in to view purchases and shipping updates. Tracking only appears
        when connected to your account.
      </p>

      {isLoading ? (
        <p className="label-code mt-10 text-dirty-white/35">
          Checking…
        </p>
      ) : user ? (
        <Link href="/account/" className="btn-solid mt-10 inline-flex focus-ring">
          View Orders
        </Link>
      ) : (
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/access/" className="btn-solid focus-ring">
            Sign In
          </Link>
          <Link href="/contact/" className="btn-ghost focus-ring">
            Contact
          </Link>
        </div>
      )}
    </div>
  );
}
