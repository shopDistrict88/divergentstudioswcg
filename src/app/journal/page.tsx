import SectionHeading from "@/components/section-heading";
import JournalCard from "@/components/journal-card";
import { journalPosts } from "@/lib/data";

export default function JournalPage() {
  return (
    <div className="section-spacing mx-auto max-w-7xl px-4 md:px-8">
      <SectionHeading
        title="Studio Journal"
        subtitle="Process notes, material studies, and behind-the-scenes thoughts"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {journalPosts.map((post, i) => (
          <JournalCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </div>
  );
}
