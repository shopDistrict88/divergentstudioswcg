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

      // Use localStorage for persistence across sessions
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
      if (savedPlaying === "true" && savedEntered === "true") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsPlaying(true);
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

  // Handle track ended callback
  const handleTrackEnded = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % Math.max(1, tracksLengthRef.current));
  }, []);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = false;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.addEventListener("ended", handleTrackEnded);
      
      // If we have tracks and user has entered before, set up audio
      const savedEntered = localStorage.getItem("divergent-entered");
      const savedPlaying = localStorage.getItem("divergent-audio-playing");
      if (savedEntered === "true" && savedPlaying === "true" && tracks.length > 0) {
        const track = tracks[currentTrackIndex];
        if (track) {
          audioRef.current.src = track.src;
          // Attempt to auto-play (may be blocked by browser)
          audioRef.current.play().catch(() => {});
        }
      }
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
