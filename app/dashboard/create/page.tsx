"use client";

import { useState } from "react";
import { ProgressStepper, defaultSteps } from "@/components/dashboard/create/progress-stepper";
import { StepFooter } from "@/components/dashboard/create/step-footer";
import { NicheStep } from "@/components/dashboard/create/steps/niche-step";
import { LanguageVoiceStep } from "@/components/dashboard/create/steps/language-voice-step";
import { BackgroundMusicStep } from "@/components/dashboard/create/steps/background-music-step";
import { VideoStyleStep } from "@/components/dashboard/create/steps/video-style-step";
import { CaptionStyleStep } from "@/components/dashboard/create/steps/caption-style-step";
import { ScheduleStep } from "@/components/dashboard/create/steps/schedule-step";
import { initialFormState, type SeriesFormState } from "@/components/dashboard/create/types";

export default function CreateSeriesPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState<SeriesFormState>(initialFormState);

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

  const handleSchedule = () => {
    console.log("Scheduling series with:", formState);
    alert("Series scheduled successfully!");
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

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ProgressStepper steps={defaultSteps} currentStep={currentStep} />
      
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
          continueLabel={currentStep === defaultSteps.length ? "Schedule" : undefined}
        />
      </div>
    </div>
  );
}
