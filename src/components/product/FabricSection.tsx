"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";

const DEFAULT_SPECS = [
  { label: "650 GSM", detail: "Heavyweight fleece" },
  { label: "Double Layer Hood", detail: "Structured construction" },
  { label: "Heavy Ribbing", detail: "Cuffs and hem" },
  { label: "Garment Wash", detail: "Pre-shrunk finish" },
  { label: "Embroidery", detail: "Studio mark" },
];

type Spec = { label: string; detail?: string };

type Props = {
  title?: string;
  specs?: Spec[];
};

/** Engineering / fabric specification blocks */
export default function FabricSection({
  title = "Built to be worn.",
  specs = DEFAULT_SPECS,
}: Props) {
  return (
    <section className="border-t border-dirty-white/10 bg-[#0f0f0f] section-cinematic">
      <div className="mx-auto max-w-[1600px]">
        <ScrollReveal>
          <h2 className="heading-display-stacked text-dirty-white">
            {title}
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-px bg-dirty-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((spec, i) => (
            <ScrollReveal key={spec.label} delay={i * 0.06}>
              <div className="flex min-h-[140px] flex-col justify-between bg-[#0f0f0f] p-8 md:p-10">
                <p className="heading-object text-dirty-white">
                  {spec.label}
                </p>
                {spec.detail && (
                  <p className="label-code mt-6 text-faded">
                    {spec.detail}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
