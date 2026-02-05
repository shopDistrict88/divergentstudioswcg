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
    name: "Ambient Drift",
    artist: "Studio Beats",
    src: "/audio/track1.mp3",
  },
];

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(true); // Auto-play on load
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const [volume, setVolumeState] = useState(0.3);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState<Track[]>(defaultTracks);
  const [hasEnteredSite, setHasEnteredSite] = useState(false);
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

      const savedEntered = sessionStorage.getItem("divergent-entered");
      if (savedEntered === "true") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasEnteredSite(true);
      }
    } catch (e) {
      console.error("Failed to load audio settings:", e);
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

  // Handle track ended callback
  const handleTrackEnded = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % Math.max(1, tracksLengthRef.current));
  }, []);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = false;
      audioRef.current.volume = volume;
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

  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current && tracks.length > 0) {
      const track = tracks[currentTrackIndex];
      if (track) {
        audioRef.current.src = track.src;
        if (isPlaying && !isMuted) {
          audioRef.current.play().catch(() => {});
        }
      }
    }
  }, [currentTrackIndex, tracks, isPlaying, isMuted]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && !isMuted) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted]);

  // Handle volume/mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  
  const toggleMute = () => setIsMuted((prev) => !prev);
  
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
    sessionStorage.setItem("divergent-entered", "true");
    if (!isMuted) {
      setIsPlaying(true);
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
