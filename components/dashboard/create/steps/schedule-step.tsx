"use client";

import { useState } from "react";
import { Check, Clock, Calendar, Youtube, Instagram, Mail } from "lucide-react";
import type { SeriesFormState } from "../types";

interface ScheduleStepProps {
  formState: SeriesFormState;
  updateFormState: (updates: Partial<SeriesFormState>) => void;
  onSchedule: () => void;
}

const durations = [
  { id: "30-50", label: "30-50 sec video" },
  { id: "60-70", label: "60-70 sec video" },
];

const platforms = [
  { id: "youtube", label: "YouTube", icon: Youtube, color: "bg-red-100 text-red-600" },
  { id: "instagram", label: "Instagram", icon: Instagram, color: "bg-gradient-to-br from-purple-100 to-pink-100 text-pink-600" },
  { id: "tiktok", label: "TikTok", icon: Mail, color: "bg-black text-white" },
  { id: "email", label: "Email", icon: Mail, color: "bg-blue-100 text-blue-600" },
];

const timeSlots = [
  { id: "09:00", label: "9:00 AM" },
  { id: "12:00", label: "12:00 PM" },
  { id: "15:00", label: "3:00 PM" },
  { id: "18:00", label: "6:00 PM" },
  { id: "21:00", label: "9:00 PM" },
];

export function ScheduleStep({ formState, updateFormState, onSchedule }: ScheduleStepProps) {
  const seriesName = formState.schedule.days?.length > 0 ? formState.schedule.days[0] : "";
  
  const handleSeriesNameChange = (name: string) => {
    updateFormState({
      schedule: { 
        ...formState.schedule, 
        days: name ? [name] : [] 
      },
    });
  };

  const handleDurationSelect = (duration: string) => {
    updateFormState({
      schedule: { 
        ...formState.schedule, 
        frequency: duration 
      },
    });
  };

  const handlePlatformToggle = (platformId: string) => {
    const currentPlatforms = formState.platform;
    updateFormState({
      platform: {
        ...currentPlatforms,
        [platformId]: !currentPlatforms[platformId as keyof typeof currentPlatforms],
      },
    });
  };

  const handleTimeSelect = (time: string) => {
    updateFormState({
      schedule: { 
        ...formState.schedule, 
        time 
      },
    });
  };

  const isPlatformSelected = (platformId: string) => {
    return formState.platform[platformId as keyof typeof formState.platform];
  };

  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Schedule Your Series</h1>
        <p className="mt-1 text-zinc-600">Configure your series details and publishing schedule</p>
      </div>

      <div className="space-y-6">
        {/* Series Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-700">Series Name</label>
          <input
            type="text"
            value={seriesName}
            onChange={(e) => handleSeriesNameChange(e.target.value)}
            placeholder="Enter series name"
            className="w-full rounded-lg border-2 border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-violet-500 focus:outline-none"
          />
        </div>

        {/* Video Duration */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-700">Video Duration</label>
          <div className="grid grid-cols-2 gap-3">
            {durations.map((duration) => (
              <button
                key={duration.id}
                onClick={() => handleDurationSelect(duration.id)}
                className={`flex items-center justify-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-all ${
                  formState.schedule.frequency === duration.id
                    ? "border-violet-600 bg-violet-50 text-violet-600"
                    : "border-zinc-200 text-zinc-700 hover:border-zinc-300"
                }`}
              >
                <Clock className="h-4 w-4" />
                {duration.label}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Selection */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-700">Select Platforms</label>
          <div className="grid grid-cols-4 gap-3">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handlePlatformToggle(platform.id)}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                  isPlatformSelected(platform.id)
                    ? "border-violet-600 bg-violet-50"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <div className={`rounded-lg p-2 ${platform.color}`}>
                  <platform.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-zinc-700">{platform.label}</span>
                {isPlatformSelected(platform.id) && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-700">Publish Time</label>
          <div className="grid grid-cols-5 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time.id}
                onClick={() => handleTimeSelect(time.id)}
                className={`flex items-center justify-center rounded-lg border-2 p-2 text-sm font-medium transition-all ${
                  formState.schedule.time === time.id
                    ? "border-violet-600 bg-violet-50 text-violet-600"
                    : "border-zinc-200 text-zinc-700 hover:border-zinc-300"
                }`}
              >
                {time.label}
              </button>
            ))}
          </div>
          <p className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
            <Calendar className="h-4 w-4" />
            Video will generate 3-6 hours before video publish
          </p>
        </div>
      </div>
    </div>
  );
}
