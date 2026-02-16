"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { SeriesFormState } from "../types";

interface VideoStyle {
  id: string;
  name: string;
  image: string;
}

const videoStyles: VideoStyle[] = [
  { id: "realistic", name: "Realistic", image: "/video-style/realistic.png" },
  { id: "gta", name: "GTA Style", image: "/video-style/gta.png" },
  { id: "cyberpunk", name: "Cyberpunk", image: "/video-style/cyberpunk.png" },
  { id: "cinematic", name: "Cinematic", image: "/video-style/cinematic.png" },
  { id: "anime", name: "Anime", image: "/video-style/anime.png" },
  { id: "3d-render", name: "3D Render", image: "/video-style/3d-render.png" },
];

interface VideoStyleStepProps {
  formState: SeriesFormState;
  updateFormState: (updates: Partial<SeriesFormState>) => void;
}

export function VideoStyleStep({ formState, updateFormState }: VideoStyleStepProps) {
  const selectedStyle = formState.videoStyle.id;

  const handleStyleSelect = (style: VideoStyle) => {
    updateFormState({
      videoStyle: { id: style.id, name: style.name },
    });
  };

  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Video Style</h1>
        <p className="mt-1 text-zinc-600">Select the visual style for your videos</p>
      </div>

      {/* Horizontal Scroll List */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4" style={{ width: "max-content" }}>
          {videoStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => handleStyleSelect(style)}
              className={`relative flex-shrink-0 overflow-hidden rounded-xl border-4 transition-all hover:border-violet-300 ${
                selectedStyle === style.id
                  ? "border-violet-600 ring-2 ring-violet-600 ring-offset-2"
                  : "border-zinc-200"
              }`}
              style={{ width: "180px", height: "320px" }}
            >
              <img
                src={style.image}
                alt={style.name}
                className="h-full w-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-center font-semibold text-white">{style.name}</p>
              </div>

              {/* Selected Check */}
              {selectedStyle === style.id && (
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600">
                  <Check className="h-5 w-5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
