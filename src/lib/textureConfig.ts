/** Texture system — disable globally via NEXT_PUBLIC_TEXTURES=off */
export const textureConfig = {
  enabled: process.env.NEXT_PUBLIC_TEXTURES !== "off",
} as const;

export function texturesAttr(): { "data-textures": "on" | "off" } {
  return { "data-textures": textureConfig.enabled ? "on" : "off" };
}
