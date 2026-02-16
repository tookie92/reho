"use client";

import { useState, useRef } from "react";
import { Check, Play, Pause, Music } from "lucide-react";
import type { SeriesFormState } from "../types";

interface BgMusic {
  id: string;
  title: string;
  url: string;
}

const bgMusicList: BgMusic[] = [
  { id: "1", title: "Instagram Reels Marketing", url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-469052.mp3" },
  { id: "2", title: "Trending Instagram Reels", url: "https://ik.imagekit.io/Tubeguruji/BgMusic/trending-instagram-reels-music-447249.mp3" },
  { id: "3", title: "Marketing Music", url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-384448.mp3" },
  { id: "4", title: "Basketball Instagram Reels", url: "https://ik.imagekit.io/Tubeguruji/BgMusic/basketball-instagram-reels-music-461852.mp3" },
  { id: "5", title: "Dramatic Hip Hop", url: "https://ik.imagekit.io/Tubeguruji/BgMusic/dramatic-hip-hop-music-background-jazz-music-for-short-video-148505.mp3" },
];

interface BackgroundMusicStepProps {
  formState: SeriesFormState;
  updateFormState: (updates: Partial<SeriesFormState>) => void;
}

export function BackgroundMusicStep({ formState, updateFormState }: BackgroundMusicStepProps) {
  const [playingMusic, setPlayingMusic] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedMusic = formState.backgroundMusic.id ? [formState.backgroundMusic.id] : [];

  const togglePreview = (music: BgMusic) => {
    if (playingMusic === music.id) {
      audioRef.current?.pause();
      setPlayingMusic(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = music.url;
        audioRef.current.play();
        setPlayingMusic(music.id);
      }
    }
  };

  const handleAudioEnded = () => {
    setPlayingMusic(null);
  };

  const toggleMusicSelection = (music: BgMusic) => {
    const currentSelections = formState.backgroundMusic.id ? formState.backgroundMusic.id.split(",") : [];
    
    if (currentSelections.includes(music.id)) {
      const newSelections = currentSelections.filter(id => id !== music.id);
      updateFormState({
        backgroundMusic: {
          id: newSelections.length > 0 ? newSelections.join(",") : null,
          name: newSelections.length > 0 ? "Selected" : null,
        },
      });
    } else {
      const newSelections = [...currentSelections, music.id];
      updateFormState({
        backgroundMusic: {
          id: newSelections.join(","),
          name: `${newSelections.length} selected`,
        },
      });
    }
  };

  const isSelected = (musicId: string) => {
    const currentSelections = formState.backgroundMusic.id ? formState.backgroundMusic.id.split(",") : [];
    return currentSelections.includes(musicId);
  };

  return (
    <div className="px-8 py-6">
      <audio ref={audioRef} onEnded={handleAudioEnded} />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Background Music</h1>
        <p className="mt-1 text-zinc-600">Select background music for your videos (multiple selection)</p>
      </div>

      <div className="space-y-3">
        {bgMusicList.map((music) => (
          <div
            key={music.id}
            className={`flex items-center justify-between rounded-lg border-2 p-4 transition-all hover:border-violet-300 ${
              isSelected(music.id)
                ? "border-violet-600 bg-violet-50"
                : "border-zinc-200 bg-white"
            }`}
          >
            <button
              onClick={() => toggleMusicSelection(music)}
              className="flex flex-1 items-center gap-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">
                <Music className="h-5 w-5 text-violet-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-zinc-900">{music.title}</p>
                <p className="text-sm text-zinc-500">Background Music</p>
              </div>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePreview(music);
                }}
                className="rounded-full bg-zinc-100 p-3 hover:bg-zinc-200"
              >
                {playingMusic === music.id ? (
                  <Pause className="h-5 w-5 text-zinc-600" />
                ) : (
                  <Play className="h-5 w-5 text-zinc-600" />
                )}
              </button>
              {isSelected(music.id) && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600">
                  <Check className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
