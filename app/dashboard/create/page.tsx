"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProgressStepper, defaultSteps } from "@/components/dashboard/create/progress-stepper";
import { StepFooter } from "@/components/dashboard/create/step-footer";
import { NicheStep } from "@/components/dashboard/create/steps/niche-step";
import { LanguageVoiceStep } from "@/components/dashboard/create/steps/language-voice-step";
import { BackgroundMusicStep } from "@/components/dashboard/create/steps/background-music-step";
import { VideoStyleStep } from "@/components/dashboard/create/steps/video-style-step";
import { CaptionStyleStep } from "@/components/dashboard/create/steps/caption-style-step";
import { ScheduleStep } from "@/components/dashboard/create/steps/schedule-step";
import { initialFormState, type SeriesFormState } from "@/components/dashboard/create/types";
import { getSeriesById, createSeries, updateSeries } from "@/actions/get-series";

function CreateSeriesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const seriesId = searchParams.get("id");
  const isEditing = Boolean(seriesId);

  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState<SeriesFormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(isEditing);

  const completedSteps = useMemo(() => {
    const completed: number[] = [];
    if (formState.niche.id) completed.push(1);
    if (formState.language.id && formState.voice.id) completed.push(2);
    if (formState.backgroundMusic.id) completed.push(3);
    if (formState.videoStyle.id) completed.push(4);
    if (formState.captionStyle.id) completed.push(5);
    if (formState.schedule.days?.length && formState.schedule.frequency && formState.schedule.time && Object.values(formState.platform).some(Boolean)) {
      completed.push(6);
    }
    return completed;
  }, [formState]);

  useEffect(() => {
    if (seriesId) {
      const fetchSeries = async () => {
        const series = await getSeriesById(seriesId);
        if (series) {
          setFormState({
            niche: {
              type: (series.niche_type as "available" | "custom") || "available",
              id: series.niche_id,
              title: series.niche_title,
            },
            language: {
              id: series.language_id,
              name: series.language_name,
            },
            voice: {
              id: series.voice_id,
              name: series.voice_name,
              gender: series.voice_gender,
            },
            videoStyle: {
              id: series.video_style_id,
              name: series.video_style_name,
            },
            backgroundMusic: {
              id: series.background_music_id,
              name: series.background_music_name,
            },
            captionStyle: {
              id: series.caption_style_id,
              name: series.caption_style_name,
            },
            platform: {
              youtube: series.platform_youtube || false,
              instagram: series.platform_instagram || false,
              tiktok: series.platform_tiktok || false,
              email: series.platform_email || false,
            },
            schedule: {
              frequency: series.video_duration,
              time: series.publish_time,
              days: series.series_name ? [series.series_name] : [],
            },
          });
        }
        setIsLoading(false);
      };
      fetchSeries();
    }
  }, [seriesId]);

  const updateFormState = (updates: Partial<SeriesFormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  };

  const handleContinue = () => {
    if (currentStep < defaultSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSchedule = async () => {
    try {
      let result;
      if (isEditing && seriesId) {
        result = await updateSeries(seriesId, formState);
      } else {
        result = await createSeries(formState);
      }

      if (result.success) {
        router.push("/dashboard");
      } else {
        alert("Error saving series: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save series");
    }
  };

  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return formState.niche.id !== null;
      case 2:
        return formState.language.id !== null && formState.voice.id !== null;
      case 3:
        return formState.backgroundMusic.id !== null;
      case 4:
        return formState.videoStyle.id !== null;
      case 5:
        return formState.captionStyle.id !== null;
      case 6:
        return formState.schedule.days?.length > 0 && formState.schedule.frequency !== null && Object.values(formState.platform).some(Boolean) && formState.schedule.time !== null;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <NicheStep formState={formState} updateFormState={updateFormState} />;
      case 2:
        return <LanguageVoiceStep formState={formState} updateFormState={updateFormState} />;
      case 3:
        return <BackgroundMusicStep formState={formState} updateFormState={updateFormState} />;
      case 4:
        return <VideoStyleStep formState={formState} updateFormState={updateFormState} />;
      case 5:
        return <CaptionStyleStep formState={formState} updateFormState={updateFormState} />;
      case 6:
        return <ScheduleStep formState={formState} updateFormState={updateFormState} onSchedule={handleSchedule} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="border-b border-zinc-200 bg-white px-8 py-4">
        <h1 className="text-xl font-bold text-zinc-900">
          {isEditing ? "Edit Series" : "Create New Series"}
        </h1>
        <p className="text-sm text-zinc-500">
          {isEditing ? "Update your series configuration" : "Set up your video series"}
        </p>
      </div>
      <ProgressStepper steps={defaultSteps} currentStep={currentStep} completedSteps={completedSteps} />
      
      <div className="flex-1 overflow-auto pb-24">
        {renderStep()}
      </div>

      <div className="sticky bottom-0 border-t border-zinc-200 bg-white">
        <StepFooter
          currentStep={currentStep}
          totalSteps={defaultSteps.length}
          onBack={handleBack}
          onContinue={currentStep === defaultSteps.length ? handleSchedule : handleContinue}
          canContinue={canContinue()}
          continueLabel={currentStep === defaultSteps.length ? (isEditing ? "Update" : "Schedule") : undefined}
        />
      </div>
    </div>
  );
}

export default function CreateSeriesPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>
      </div>
    }>
      <CreateSeriesContent />
    </Suspense>
  );
}
