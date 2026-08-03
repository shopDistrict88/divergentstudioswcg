"use client";

import { Suspense } from "react";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050505] px-4 pt-24">
          <p className="label-code text-faded">Loading…</p>
        </div>
      }
    >
      <ContactForm />
    </Suspense>
  );
}
