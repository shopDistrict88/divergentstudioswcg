import { notFound } from "next/navigation";
import { fetchJournalPosts } from "@/lib/supabase-data";
import JournalPostContent from "@/components/journal-post-content";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await fetchJournalPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await fetchJournalPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <JournalPostContent post={post} />;
}
