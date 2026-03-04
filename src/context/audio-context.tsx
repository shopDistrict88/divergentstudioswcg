"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from "react";

interface Track {
  id: string;
  name: string;
  artist: string;
  src: string;
}

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTrack: Track | null;
  tracks: Track[];
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  playTrack: (track: Track) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  addTrack: (track: Track) => void;
  removeTrack: (id: string) => void;
  hasEnteredSite: boolean;
  enterSite: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Default demo tracks - these can be replaced via admin
const defaultTracks: Track[] = [
  {
    id: "1",
    name: "Nine Vicious",
    artist: "Type Beat",
    src: "/audio/nine-vicious.m4a",
  },
  {
    id: "2",
    name: "EsDeeKid",
    artist: "Type Beat",
    src: "/audio/esdeekid.m4a",
  },
  {
    id: "3",
    name: "KD!",
    artist: "Type Beat",
    src: "/audio/kd.m4a",
  },
  {
    id: "4",
    name: "Lil Uzi Vert",
    artist: "Type Beat",
    src: "/audio/lil-uzi-vert.m4a",
  },
  {
    id: "5",
    name: "Juice WRLD x Trippie Redd",
    artist: "Type Beat",
    src: "/audio/juice-wrld-trippie.m4a",
  },
  {
    id: "6",
    name: "My Song 783",
    artist: "Type Beat",
    src: "/audio/my-song-783.m4a",
  },
];

// Shuffle array helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false); // Start false, set true after hydration
  const [isMuted, setIsMuted] = useState(false); // Start unmuted
  const [volume, setVolumeState] = useState(0.3);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState<Track[]>(() => shuffleArray(defaultTracks)); // Shuffle on init
  const [hasEnteredSite, setHasEnteredSite] = useState(true); // Launched — no splash gate
  const [isHydrated, setIsHydrated] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tracksLengthRef = useRef(tracks.length);

  // Load stored values after hydration
  useEffect(() => {
    try {
      const savedTracks = localStorage.getItem("divergent-audio-tracks");
      if (savedTracks) {
        const parsed = JSON.parse(savedTracks);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setTracks(parsed);
        }
      }

      const savedMuted = localStorage.getItem("divergent-audio-muted");
      if (savedMuted !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMuted(savedMuted === "true");
      }

      // Splash disabled (site launched) — keep for any future re-enable
      const savedEntered = localStorage.getItem("divergent-entered");
      if (savedEntered === "true") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasEnteredSite(true);
      }

      // Restore track index
      const savedTrackIndex = localStorage.getItem("divergent-track-index");
      if (savedTrackIndex !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentTrackIndex(parseInt(savedTrackIndex, 10) || 0);
      }

      // Restore playing state (only if user has entered before)
      const savedPlaying = localStorage.getItem("divergent-audio-playing");
      const savedMutedVal = localStorage.getItem("divergent-audio-muted");
      
      if (savedEntered === "true") {
        // User has entered before - auto-resume
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsPlaying(true);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMuted(savedMutedVal === "true");
      }
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsHydrated(true);
    } catch (e) {
      console.error("Failed to load audio settings:", e);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsHydrated(true);
    }
  }, []);

  // Keep tracks length ref updated
  useEffect(() => {
    tracksLengthRef.current = tracks.length;
  }, [tracks.length]);

  // Save muted state
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("divergent-audio-muted", String(isMuted));
    }
  }, [isMuted]);

  // Save playing state
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("divergent-audio-playing", String(isPlaying));
    }
  }, [isPlaying]);

  // Save track index
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("divergent-track-index", String(currentTrackIndex));
    }
  }, [currentTrackIndex]);

  // Handle track ended callback - add 3 second delay before next track
  const handleTrackEnded = useCallback(() => {
    // Pause briefly, then move to next track
    setTimeout(() => {
      setCurrentTrackIndex((prev) => (prev + 1) % Math.max(1, tracksLengthRef.current));
    }, 3000); // 3 second delay between tracks
  }, []);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = false;
      audioRef.current.muted = isMuted;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.addEventListener("ended", handleTrackEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleTrackEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [handleTrackEnded]);

  // Auto-play after hydration completes (when user has previously entered)
  useEffect(() => {
    if (isHydrated && isPlaying && audioRef.current && tracks.length > 0) {
      const track = tracks[currentTrackIndex];
      if (track) {
        audioRef.current.src = track.src;
        audioRef.current.muted = isMuted;
        audioRef.current.volume = isMuted ? 0 : volume;
        // Attempt to auto-play (may be blocked by browser)
        audioRef.current.play().catch(() => {
          // Browser blocked autoplay - that's okay
        });
      }
    }
  }, [isHydrated]);

  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current && tracks.length > 0) {
      const track = tracks[currentTrackIndex];
      if (track) {
        audioRef.current.src = track.src;
        if (isPlaying) {
          audioRef.current.play().catch(() => {});
        }
      }
    }
  }, [currentTrackIndex, tracks, isPlaying]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume/mute — use native .muted for reliability
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  
  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.muted = newMuted;
      audioRef.current.volume = newMuted ? 0 : volume;
      if (!newMuted && !isPlaying) {
        setIsPlaying(true);
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted, volume, isPlaying]);
  
  const setVolume = (v: number) => setVolumeState(Math.max(0, Math.min(1, v)));

  const playTrack = (track: Track) => {
    const index = tracks.findIndex((t) => t.id === track.id);
    if (index !== -1) {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const addTrack = (track: Track) => {
    const newTracks = [...tracks, track];
    setTracks(newTracks);
    localStorage.setItem("divergent-audio-tracks", JSON.stringify(newTracks));
  };

  const removeTrack = (id: string) => {
    const newTracks = tracks.filter((t) => t.id !== id);
    setTracks(newTracks);
    localStorage.setItem("divergent-audio-tracks", JSON.stringify(newTracks));
  };

  const enterSite = () => {
    setHasEnteredSite(true);
    localStorage.setItem("divergent-entered", "true");
    // Start playing and unmute when user enters
    setIsMuted(false);
    setIsPlaying(true);
    // Try to play immediately
    if (audioRef.current && tracks.length > 0) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {});
    }
  };

  const currentTrack = tracks[currentTrackIndex] || null;

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        currentTrack,
        tracks,
        togglePlay,
        toggleMute,
        setVolume,
        playTrack,
        nextTrack,
        prevTrack,
        addTrack,
        removeTrack,
        hasEnteredSite,
        enterSite,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
