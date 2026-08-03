"use client";

export default function ReleaseNote() {
  return (
    <section className="border-t border-dirty-white/10 bg-[#080808] px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-[1600px] md:grid md:grid-cols-12">
        <p className="label-code text-dirty-white/30 md:col-span-2">
          Note
        </p>
        <div className="mt-6 space-y-2 md:col-span-4 md:col-start-6 md:mt-0">
          <p className="label-code text-dirty-white/55">
            Open until removed
          </p>
          <p className="label-code text-dirty-white/55">
            No restock confirmed
          </p>
          <p className="label-code text-dirty-white/55">
            Archive when closed
          </p>
        </div>
      </div>
    </section>
  );
}
