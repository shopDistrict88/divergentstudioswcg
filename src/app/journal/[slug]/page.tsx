import { notFound } from "next/navigation";
import { journalPosts } from "@/lib/data";
import JournalPostContent from "@/components/journal-post-content";

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <JournalPostContent post={post} />;
}
