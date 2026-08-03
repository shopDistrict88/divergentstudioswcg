export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-[100dvh] w-full overflow-hidden">{children}</div>;
}
