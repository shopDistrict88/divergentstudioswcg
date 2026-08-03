import type { RoomConfig } from "./types";
import { entranceRoom } from "./rooms/entrance";
import { designStudioRoom } from "./rooms/design-studio";
import { manufacturingRoom } from "./rooms/manufacturing-room";
import { materialLibraryRoom } from "./rooms/material-library";
import { photographyStudioRoom } from "./rooms/photography-studio";
import { archiveRoom } from "./rooms/archive";
import { vaultRoom } from "./rooms/vault";
import { placeholderRoom } from "./rooms/placeholder";

export const ROOMS: Record<string, RoomConfig> = {
  entrance: entranceRoom,
  "design-studio": designStudioRoom,
  "manufacturing-room": manufacturingRoom,
  "material-library": materialLibraryRoom,
  "photography-studio": photographyStudioRoom,
  archive: archiveRoom,
  vault: vaultRoom,
  placeholder: placeholderRoom,
};

export const ROOM_ORDER: string[] = [
  "entrance",
  "design-studio",
  "manufacturing-room",
  "material-library",
  "photography-studio",
  "archive",
  "vault",
];

export const DEFAULT_ROOM_ID = "entrance";

export function getRoom(id: string): RoomConfig | undefined {
  return ROOMS[id];
}

export function getAdjacentRooms(id: string): {
  prev?: RoomConfig;
  next?: RoomConfig;
} {
  const idx = ROOM_ORDER.indexOf(id);
  if (idx === -1) return {};
  const prevId =
    idx > 0 ? ROOM_ORDER[idx - 1] : ROOM_ORDER[ROOM_ORDER.length - 1];
  const nextId =
    idx < ROOM_ORDER.length - 1 ? ROOM_ORDER[idx + 1] : ROOM_ORDER[0];
  return {
    prev: ROOMS[prevId],
    next: ROOMS[nextId],
  };
}

export * from "./types";
export * from "./preload";
