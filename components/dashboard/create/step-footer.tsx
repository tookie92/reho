"use client";

import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface StepFooterProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onContinue: () => void;
  canContinue?: boolean;
  backLabel?: string;
  continueLabel?: string;
}

export function StepFooter({
  currentStep,
  totalSteps,
  onBack,
  onContinue,
  canContinue = true,
  backLabel = "Back",
  continueLabel = "Continue",
}: StepFooterProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between border-t border-zinc-200 bg-white px-8 py-4">
      <div>
        {!isFirstStep && onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            <ChevronLeft className="h-4 w-4" />
            {backLabel}
          </button>
        )}
      </div>
      <div>
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {continueLabel}
          {!isLastStep && <ChevronRight className="h-4 w-4" />}
          {isLastStep && <Check className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
