import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductSlugRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/artifacts/${slug}/`);
}
