"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";

const sections = [
  {
    title: "Shipping",
    content: [
      "Orders ship within 3–5 business days from Raleigh, NC.",
      "Domestic and international shipping available. Rates calculated at checkout.",
      "Tracking is sent once the order leaves the studio.",
    ],
  },
  {
    title: "Processing",
    content: [
      "Limited production runs — some pieces may ship separately if restocked.",
      "Made-to-order items require additional lead time noted at checkout.",
    ],
  },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 pb-24 pt-24 md:px-6">
      <div className="mx-auto max-w-2xl">
        <ScrollReveal>
          <p className="label-code text-faded">Operations</p>
          <h1 className="heading-section mt-4 text-[#E8E6E1]">SHIPPING</h1>
        </ScrollReveal>
        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="border-t border-dirty-white/10 pt-8">
              <h2 className="label-code text-dirty-white/50">{section.title}</h2>
              <ul className="mt-4 space-y-3">
                {section.content.map((line) => (
                  <li key={line} className="body-copy">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
