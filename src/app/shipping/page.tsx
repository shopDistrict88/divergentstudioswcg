"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/section-heading";

const sections = [
  {
    title: "Shipping",
    content: [
      "All orders ship within 3–5 business days from Los Angeles, CA.",
      "Free domestic shipping on orders over $150.",
      "International shipping is available. Rates are calculated at checkout.",
      "Tracking information is emailed once your order ships.",
    ],
  },
  {
    title: "Returns",
    content: [
      "We accept returns within 14 days of delivery for unworn items in original packaging.",
      "To initiate a return, contact us at returns@divergentstudios.com.",
      "Return shipping is the responsibility of the customer unless the item is defective.",
      "Refunds are processed within 5–7 business days of receiving the returned item.",
    ],
  },
  {
    title: "Exchanges",
    content: [
      "Exchanges are available for sizing issues only.",
      "Contact us within 14 days of delivery to request an exchange.",
      "Exchanged items must be unworn and in original packaging.",
    ],
  },
  {
    title: "Contact",
    content: [
      "For shipping or return inquiries, email support@divergentstudios.com.",
      "We respond within 24–48 hours.",
    ],
  },
];

export default function ShippingPage() {
  return (
    <div className="section-spacing mx-auto max-w-3xl px-4 md:px-8">
      <SectionHeading
        title="Shipping & Returns"
        subtitle="Policies for domestic and international orders"
      />

      <div className="space-y-12">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.content.map((line, j) => (
                <li key={j} className="text-sm leading-relaxed text-white/60">
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
