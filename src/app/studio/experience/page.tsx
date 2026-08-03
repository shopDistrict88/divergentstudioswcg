import StudioExperience from "@/components/living-scene/studio-experience";

export const metadata = {
  title: "Studio Experience | Divergent Studios",
  description:
    "Explore the Divergent Studios spatial experience — rooms, vault, and archive.",
};

type Props = {
  searchParams: Promise<{ room?: string; debug?: string }>;
};

export default async function StudioExperiencePage({ searchParams }: Props) {
  const params = await searchParams;
  const initialRoom = params.room ?? "entrance";
  const showDebug = params.debug === "1";

  return (
    <StudioExperience
      initialRoomId={initialRoom}
      showHotspotDebug={showDebug}
    />
  );
}
