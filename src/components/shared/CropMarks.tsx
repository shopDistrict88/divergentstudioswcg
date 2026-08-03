"use client";

type Props = {
  className?: string;
};

/** Print crop marks — selective, not on every section */
export default function CropMarks({ className = "" }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-3 z-[2] opacity-40 md:inset-5 ${className}`}
      aria-hidden
    >
      <span className="absolute left-0 top-0 h-3 w-px bg-dirty-white/40" />
      <span className="absolute left-0 top-0 h-px w-3 bg-dirty-white/40" />
      <span className="absolute right-0 top-0 h-3 w-px bg-dirty-white/40" />
      <span className="absolute right-0 top-0 h-px w-3 bg-dirty-white/40" />
      <span className="absolute bottom-0 left-0 h-3 w-px bg-dirty-white/40" />
      <span className="absolute bottom-0 left-0 h-px w-3 bg-dirty-white/40" />
      <span className="absolute bottom-0 right-0 h-3 w-px bg-dirty-white/40" />
      <span className="absolute bottom-0 right-0 h-px w-3 bg-dirty-white/40" />
    </div>
  );
}
