"use client";

type SceneVignetteProps = {
  intensity?: number;
};

export default function SceneVignette({ intensity = 0.5 }: SceneVignetteProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[60]"
      style={{
        background: `radial-gradient(ellipse 70% 65% at 50% 50%, transparent 30%, rgba(0,0,0,${intensity}) 100%)`,
      }}
      aria-hidden
    />
  );
}
