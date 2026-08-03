import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const { email, source = "nova" } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const normalized = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { error } = await admin.from("alert_subscribers").insert({
      email: normalized,
      source,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ success: true, alreadySubscribed: true });
      }
      console.error("[alert-signup]", error);
      return NextResponse.json({ error: "Could not save signup" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[alert-signup]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Signup failed" },
      { status: 500 }
    );
  }
}
