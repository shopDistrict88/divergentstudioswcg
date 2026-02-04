import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <Link
      href="/exhibitions/nova"
      className="flex items-center justify-center bg-[var(--accent)]/15 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--accent)] transition hover:bg-[var(--accent)]/20"
    >
      Exhibition 001: NOVA — Live Now
    </Link>
  );
}
