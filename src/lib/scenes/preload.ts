import type { RoomConfig } from "./types";

function collectAssetUrls(room: RoomConfig): string[] {
  const urls = new Set<string>();

  if (room.background.startsWith("/") || room.background.startsWith("http")) {
    urls.add(room.background);
  }

  for (const layer of room.layers) {
    if (layer.src) urls.add(layer.src);
  }

  return Array.from(urls);
}

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

function preloadVideo(url: string): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.onloadeddata = () => resolve();
    video.onerror = () => resolve();
    video.src = url;
  });
}

export async function preloadRoomAssets(room: RoomConfig): Promise<void> {
  const urls = collectAssetUrls(room);
  await Promise.all(
    urls.map((url) =>
      url.match(/\.(mp4|webm|mov)(\?|$)/i)
        ? preloadVideo(url)
        : preloadImage(url)
    )
  );
}

export function preloadRoomAssetsQuiet(room: RoomConfig): void {
  void preloadRoomAssets(room);
}
