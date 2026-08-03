import StudioExperience from "@/components/living-scene/studio-experience";

export const metadata = {
  title: "Studio | Divergent Studios",
  description:
    "Explore the Divergent Studios exhibition — a living 2.5D spatial experience.",
};

type StudioPageProps = {
  searchParams: Promise<{ room?: string; debug?: string }>;
};

export default async function StudioPage({ searchParams }: StudioPageProps) {
  const params = await searchParams;
  // ?room=placeholder|entrance|vault…  ?debug=1 outlines hotspots
  const initialRoom = params.room ?? "entrance";
  const showDebug = params.debug === "1";

  return (
    <StudioExperience
      initialRoomId={initialRoom}
      showHotspotDebug={showDebug}
    />
  );
}
