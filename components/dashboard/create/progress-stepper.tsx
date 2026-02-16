"use client";

import { Check, Sparkles, Zap, Heart, Star, Flame, Calendar, Music } from "lucide-react";

interface Step {
  id: number;
  name: string;
  icon: React.ElementType;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="border-b border-zinc-200 bg-white px-8 py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  currentStep > step.id
                    ? "border-violet-600 bg-violet-600 text-white"
                    : currentStep === step.id
                    ? "border-violet-600 bg-white text-violet-600"
                    : "border-zinc-300 bg-white text-zinc-400"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  currentStep >= step.id ? "text-violet-600" : "text-zinc-400"
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 w-16 ${
                  currentStep > step.id ? "bg-violet-600" : "bg-zinc-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export const defaultSteps: Step[] = [
  { id: 1, name: "Niche", icon: Sparkles },
  { id: 2, name: "Language", icon: Zap },
  { id: 3, name: "Music", icon: Music },
  { id: 4, name: "Video Style", icon: Star },
  { id: 5, name: "Caption Style", icon: Heart },
  { id: 6, name: "Schedule", icon: Calendar },
];
