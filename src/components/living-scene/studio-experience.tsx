"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Map } from "lucide-react";
import {
  DEFAULT_ROOM_ID,
  ROOM_ORDER,
  ROOMS,
  getRoom,
  preloadRoomAssetsQuiet,
  type RoomConfig,
} from "@/lib/scenes";
import LivingScene from "./living-scene";
import SceneTransitionOverlay, {
  getDefaultTransition,
} from "./scene-transition";

type StudioExperienceProps = {
  initialRoomId?: string;
  showHotspotDebug?: boolean;
};

type TransitionState = {
  active: boolean;
  targetRoomId: string | null;
  phase: "exit" | "enter";
};

export default function StudioExperience({
  initialRoomId = DEFAULT_ROOM_ID,
  showHotspotDebug = false,
}: StudioExperienceProps) {
  const [currentRoomId, setCurrentRoomId] = useState(initialRoomId);
  const [transition, setTransition] = useState<TransitionState>({
    active: false,
    targetRoomId: null,
    phase: "exit",
  });
  const [revealText, setRevealText] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  const currentRoom = getRoom(currentRoomId) ?? getRoom(DEFAULT_ROOM_ID)!;

  useEffect(() => {
    const idx = ROOM_ORDER.indexOf(currentRoomId);
    const adjacentIds = [
      idx > 0 ? ROOM_ORDER[idx - 1] : ROOM_ORDER[ROOM_ORDER.length - 1],
      idx < ROOM_ORDER.length - 1 ? ROOM_ORDER[idx + 1] : ROOM_ORDER[0],
    ].filter((id): id is string => Boolean(id) && id !== currentRoomId);

    for (const id of [...new Set(adjacentIds)]) {
      const room = getRoom(id);
      if (room) preloadRoomAssetsQuiet(room);
    }
  }, [currentRoomId]);

  const crossfadeAmbient = useCallback((room: RoomConfig) => {
    const prev = ambientRef.current;
    if (prev) {
      const fadeOut = setInterval(() => {
        if (prev.volume > 0.02) prev.volume = Math.max(0, prev.volume - 0.02);
        else {
          prev.pause();
          clearInterval(fadeOut);
        }
      }, 50);
      ambientRef.current = null;
    }

    if (!room.ambientAudio) return;

    const audio = new Audio(room.ambientAudio);
    audio.loop = true;
    audio.volume = 0;
    audio.addEventListener(
      "error",
      () => {
        if (ambientRef.current === audio) ambientRef.current = null;
      },
      { once: true }
    );

    audio
      .play()
      .then(() => {
        const fadeIn = setInterval(() => {
          if (audio.volume < 0.15) audio.volume = Math.min(0.15, audio.volume + 0.01);
          else clearInterval(fadeIn);
        }, 50);
      })
      .catch(() => {});

    ambientRef.current = audio;
  }, []);

  useEffect(() => {
    crossfadeAmbient(currentRoom);
    return () => {
      ambientRef.current?.pause();
    };
  }, [currentRoom, crossfadeAmbient]);

  const completeTransition = useCallback(() => {
    if (transition.phase === "exit" && transition.targetRoomId) {
      setCurrentRoomId(transition.targetRoomId);
      setTransition({
        active: true,
        targetRoomId: transition.targetRoomId,
        phase: "enter",
      });
    } else {
      setTransition({ active: false, targetRoomId: null, phase: "exit" });
    }
  }, [transition]);

  const navigateToRoom = useCallback(
    (targetId: string) => {
      if (transition.active || targetId === currentRoomId) return;
      const targetRoom = getRoom(targetId);
      if (!targetRoom) return;

      preloadRoomAssetsQuiet(targetRoom);
      setMapOpen(false);
      setRevealText(null);

      setTransition({
        active: true,
        targetRoomId: targetId,
        phase: "exit",
      });
    },
    [currentRoomId, transition.active]
  );

  const handleNavigate = useCallback(
    (target: string) => navigateToRoom(target),
    [navigateToRoom]
  );

  const handleReveal = useCallback((label: string) => {
    setRevealText(label);
    setTimeout(() => setRevealText(null), 4000);
  }, []);

  const currentIdx = ROOM_ORDER.indexOf(currentRoomId);
  const prevRoomId =
    currentRoom.prevRoom ??
    (currentIdx > 0
      ? ROOM_ORDER[currentIdx - 1]
      : ROOM_ORDER[ROOM_ORDER.length - 1]);
  const nextRoomId =
    currentRoom.nextRoom ??
    (currentIdx < ROOM_ORDER.length - 1
      ? ROOM_ORDER[currentIdx + 1]
      : ROOM_ORDER[0]);

  const activeTransition =
    transition.phase === "exit"
      ? currentRoom.exitTransition ?? getDefaultTransition()
      : getRoom(transition.targetRoomId ?? "")?.entranceTransition ??
        getDefaultTransition();

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#050505]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoomId}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <LivingScene
            room={currentRoom}
            onNavigate={handleNavigate}
            onReveal={handleReveal}
            showHotspotDebug={showHotspotDebug}
          />
        </motion.div>
      </AnimatePresence>

      {/* Room HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[70] flex items-start justify-between p-6 md:p-8">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/40">
            {currentRoom.subtitle ?? "Divergent Studios"}
          </p>
          <h1 className="mt-1 text-lg font-light uppercase tracking-[0.2em] text-white/90 md:text-xl">
            {currentRoom.title}
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setMapOpen((o) => !o)}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-sm transition hover:border-white/25 hover:text-white"
          aria-label="Room map"
        >
          <Map className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-0 z-[70] flex items-center pl-4 md:pl-6">
        {prevRoomId && (
          <button
            type="button"
            onClick={() => navigateToRoom(prevRoomId)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/60 backdrop-blur-sm transition hover:border-white/25 hover:text-white"
            aria-label="Previous room"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="absolute inset-y-0 right-0 z-[70] flex items-center pr-4 md:pr-6">
        {nextRoomId && (
          <button
            type="button"
            onClick={() => navigateToRoom(nextRoomId)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/60 backdrop-blur-sm transition hover:border-white/25 hover:text-white"
            aria-label="Next room"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Room progress */}
      <div className="absolute inset-x-0 bottom-0 z-[70] flex justify-center gap-1.5 p-6">
        {ROOM_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => navigateToRoom(id)}
            className={`h-1 rounded-full transition-all duration-500 ${
              id === currentRoomId
                ? "w-8 bg-[var(--accent)]"
                : "w-3 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={ROOMS[id]?.title}
          />
        ))}
      </div>

      {/* Room map overlay */}
      <AnimatePresence>
        {mapOpen && (
          <motion.div
            className="absolute inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMapOpen(false)}
          >
            <motion.div
              className="grid max-w-lg grid-cols-2 gap-3 p-6 md:grid-cols-3"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {ROOM_ORDER.map((id) => {
                const room = ROOMS[id];
                if (!room) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => navigateToRoom(id)}
                    className={`rounded-xl border px-4 py-5 text-left transition ${
                      id === currentRoomId
                        ? "border-[var(--accent)] bg-[var(--accent)]/10"
                        : "border-white/10 bg-white/5 hover:border-white/25"
                    }`}
                  >
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                      {room.subtitle}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-white/80">
                      {room.title}
                    </p>
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reveal toast */}
      <AnimatePresence>
        {revealText && (
          <motion.div
            className="absolute bottom-20 left-1/2 z-[75] max-w-md -translate-x-1/2 rounded-full border border-white/15 bg-black/80 px-6 py-3 backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <p className="text-center text-[11px] uppercase tracking-[0.2em] text-white/70">
              {revealText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition overlay */}
      {transition.active && (
        <SceneTransitionOverlay
          transition={activeTransition}
          phase={transition.phase}
          onComplete={completeTransition}
        />
      )}
    </div>
  );
}
