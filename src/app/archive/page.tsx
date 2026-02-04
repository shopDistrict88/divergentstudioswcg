import SectionHeading from "@/components/section-heading";
import ArchiveCard from "@/components/archive-card";
import { exhibitions } from "@/lib/data";

export default function ArchivePage() {
  return (
    <div className="section-spacing mx-auto max-w-7xl px-4 md:px-8">
      <SectionHeading
        title="Exhibition Archive"
        subtitle="Past, present, and future installations"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {exhibitions.map((exhibition, i) => (
          <ArchiveCard key={exhibition.id} exhibition={exhibition} index={i} />
        ))}
        <ArchiveCard locked index={exhibitions.length} />
      </div>
    </div>
  );
}
