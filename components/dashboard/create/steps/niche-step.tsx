"use client";

import { useState } from "react";
import { Check, Sparkles, Ghost, Zap, Star, Heart, Briefcase, Music, Gamepad2, Brain } from "lucide-react";
import type { SeriesFormState } from "../types";

interface NicheStepProps {
  formState: SeriesFormState;
  updateFormState: (updates: Partial<SeriesFormState>) => void;
}

const niches = [
  {
    id: "scary-stories",
    title: "Scary Stories",
    description: "Short horror and thriller tales",
    icon: Ghost,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "motivational",
    title: "Motivational",
    description: "Inspiring quotes and stories",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "fun-facts",
    title: "Fun Facts",
    description: "Interesting trivia and facts",
    icon: Star,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "relationship",
    title: "Relationship Tips",
    description: "Dating and relationship advice",
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "career",
    title: "Career & Business",
    description: "Professional growth tips",
    icon: Briefcase,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "music",
    title: "Music Facts",
    description: "Music history and trivia",
    icon: Music,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "gaming",
    title: "Gaming",
    description: "Gaming news and tips",
    icon: Gamepad2,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "science",
    title: "Science Facts",
    description: "Amazing science discoveries",
    icon: Brain,
    color: "bg-cyan-100 text-cyan-600",
  },
];

export function NicheStep({ formState, updateFormState }: NicheStepProps) {
  const activeTab = formState.niche.type;
  const selectedNiche = formState.niche.id;

  const setActiveTab = (type: "available" | "custom") => {
    updateFormState({
      niche: { ...formState.niche, type },
    });
  };

  const selectNiche = (id: string, title: string) => {
    updateFormState({
      niche: { ...formState.niche, id, title },
    });
  };

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Choose Your Niche</h1>
        <p className="mt-2 text-zinc-600">
          Select the category that best fits your video content
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg bg-zinc-100 p-1">
        <button
          onClick={() => setActiveTab("available")}
          className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
            activeTab === "available"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          Available Niche
        </button>
        <button
          onClick={() => setActiveTab("custom")}
          className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
            activeTab === "custom"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          Custom Niche
        </button>
      </div>

      {/* Niche List */}
      {activeTab === "available" && (
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-3">
            {niches.map((niche) => (
              <button
                key={niche.id}
                onClick={() => selectNiche(niche.id, niche.title)}
                className={`flex items-start gap-3 rounded-lg border-2 p-3 text-left transition-all hover:border-violet-300 ${
                  selectedNiche === niche.id
                    ? "border-violet-600 bg-violet-50"
                    : "border-zinc-200 bg-white hover:bg-zinc-50"
                }`}
              >
                <div className={`rounded-lg p-1.5 ${niche.color}`}>
                  <niche.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-zinc-900 truncate">{niche.title}</h3>
                  <p className="text-xs text-zinc-500 line-clamp-1">{niche.description}</p>
                </div>
                {selectedNiche === niche.id && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "custom" && (
        <div className="mb-8">
          <div className="rounded-xl border-2 border-dashed border-zinc-300 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
              <Sparkles className="h-6 w-6 text-zinc-400" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900">Create Custom Niche</h3>
            <p className="mt-2 text-zinc-600">
              Define your own niche category for unique content
            </p>
            <button className="mt-4 rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">
              Create Custom Niche
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
