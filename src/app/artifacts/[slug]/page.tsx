import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function ArtifactsSlugRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/object/${slug}/`);
}
