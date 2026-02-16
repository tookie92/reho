"use client";

import { useState, useRef } from "react";
import { Check, Play, Pause, User, User2, ChevronDown } from "lucide-react";
import type { SeriesFormState } from "../types";
import { Languages, Voices, type Voice } from "../data/options";

interface LanguageVoiceStepProps {
  formState: SeriesFormState;
  updateFormState: (updates: Partial<SeriesFormState>) => void;
}

export function LanguageVoiceStep({ formState, updateFormState }: LanguageVoiceStepProps) {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const selectedLanguageId = formState.language.id;
  const selectedLanguage = Languages.find(l => l.id === selectedLanguageId);
  const selectedVoice = formState.voice.id;

  const handleLanguageSelect = (langId: string, langName: string) => {
    updateFormState({
      language: { id: langId, name: langName },
      voice: { id: null, name: null, gender: null },
    });
    setIsLanguageOpen(false);
  };

  const handleVoiceSelect = (voice: Voice) => {
    updateFormState({
      voice: { id: voice.id, name: voice.modelName, gender: voice.gender },
    });
  };

  const togglePreview = (voice: Voice) => {
    if (playingVoice === voice.id) {
      audioRef.current?.pause();
      setPlayingVoice(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = voice.preview;
        audioRef.current.play();
        setPlayingVoice(voice.id);
      }
    }
  };

  const handleAudioEnded = () => {
    setPlayingVoice(null);
  };

  return (
    <div className="px-8 py-6">
      <audio 
        ref={audioRef} 
        onEnded={handleAudioEnded} 
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Language & Voice</h1>
        <p className="mt-1 text-zinc-600">Select language and voice for your videos</p>
      </div>

      {/* Language Select */}
      <div className="mb-8">
        <label className="mb-2 block text-sm font-semibold text-zinc-700">Select Language</label>
        <div className="relative">
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex w-full items-center justify-between rounded-lg border-2 border-zinc-300 bg-white px-4 py-3 text-left"
          >
            {selectedLanguage ? (
              <span className="flex items-center gap-2">
                <span className="text-xl">{selectedLanguage.countryFlag}</span>
                <span className="font-medium text-zinc-900">{selectedLanguage.language}</span>
              </span>
            ) : (
              <span className="text-zinc-400">Choose a language</span>
            )}
            <ChevronDown className="h-5 w-5 text-zinc-400" />
          </button>
          
          {isLanguageOpen && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border-2 border-zinc-200 bg-white shadow-lg">
              {Languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageSelect(lang.id, lang.language)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50"
                >
                  <span className="text-xl">{lang.countryFlag}</span>
                  <span className="font-medium text-zinc-900">{lang.language}</span>
                  {selectedLanguageId === lang.id && (
                    <Check className="ml-auto h-4 w-4 text-violet-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Voice Selection */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-zinc-700">Available Voices</h2>
        <div className="grid grid-cols-2 gap-3">
          {Voices.map((voice) => (
            <button
              key={voice.id}
              onClick={() => handleVoiceSelect(voice)}
              className={`flex items-center justify-between rounded-lg border-2 p-3 transition-all hover:border-violet-300 ${
                selectedVoice === voice.id
                  ? "border-violet-600 bg-violet-50"
                  : "border-zinc-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2 ${voice.gender === 'female' ? 'bg-pink-100' : 'bg-blue-100'}`}>
                  {voice.gender === 'female' ? (
                    <User className="h-4 w-4 text-pink-600" />
                  ) : (
                    <User2 className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-zinc-900">{voice.modelName}</p>
                  <p className="text-xs text-zinc-500 capitalize">{voice.gender} • {voice.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePreview(voice);
                  }}
                  className="rounded-full bg-zinc-100 p-2 hover:bg-zinc-200"
                >
                  {playingVoice === voice.id ? (
                    <Pause className="h-4 w-4 text-zinc-600" />
                  ) : (
                    <Play className="h-4 w-4 text-zinc-600" />
                  )}
                </button>
                {selectedVoice === voice.id && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
