"use client";

import { useState } from "react";
import type { SceneHotspot as SceneHotspotType } from "@/lib/scenes/types";

type SceneHotspotProps = {
  hotspot: SceneHotspotType;
  onNavigate?: (target: string) => void;
  onReveal?: (label: string) => void;
  showDebug?: boolean;
};

export default function SceneHotspot({
  hotspot,
  onNavigate,
  onReveal,
  showDebug = false,
}: SceneHotspotProps) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const { action } = hotspot;
    if (action.type === "navigate" && action.target) {
      onNavigate?.(action.target);
    } else if (action.type === "reveal" && action.label) {
      onReveal?.(action.label);
    } else if (action.type === "external" && action.target) {
      window.open(action.target, "_blank", "noopener");
    }
  };

  const hidden = hotspot.revealOnHover && !hovered && !showDebug;

  return (
    <button
      type="button"
      className={`absolute z-[50] transition-all duration-500 focus:outline-none ${
        showDebug
          ? "border border-dashed border-white/20 bg-white/5"
          : "border-0 bg-transparent"
      } ${hidden ? "opacity-0" : "opacity-100"} ${
        hovered ? "cursor-pointer" : ""
      }`}
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      aria-label={hotspot.label ?? hotspot.action.label}
    >
      {(hovered || showDebug) && hotspot.label && (
        <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm">
          {hotspot.label}
        </span>
      )}
    </button>
  );
}
