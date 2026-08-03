import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function ExhibitionSlugRedirect({ params }: Props) {
  const { slug } = await params;
  if (slug === "nova") redirect("/exhibitions/nova/");
  redirect("/archive/");
}
