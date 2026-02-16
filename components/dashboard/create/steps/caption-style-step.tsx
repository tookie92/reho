"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import type { SeriesFormState } from "../types";
import { CaptionStyles, type CaptionStyle } from "../data/CaptionStyles";

interface CaptionStyleStepProps {
  formState: SeriesFormState;
  updateFormState: (updates: Partial<SeriesFormState>) => void;
}

const sampleText = "This is how your caption will look";

function AnimatedCaption({ style, isPreview }: { style: CaptionStyle; isPreview: boolean }) {
  const [animationClass, setAnimationClass] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [style.id]);

  useEffect(() => {
    if (!visible) return;
    
    setAnimationClass("");
    switch (style.animation) {
      case "fade":
        setAnimationClass("animate-fade");
        break;
      case "slide-up":
        setAnimationClass("animate-slide-up");
        break;
      case "slide-down":
        setAnimationClass("animate-slide-down");
        break;
      case "typewriter":
        setAnimationClass("animate-typewriter");
        break;
      case "bounce":
        setAnimationClass("animate-bounce");
        break;
      case "scale":
        setAnimationClass("animate-scale");
        break;
    }
  }, [visible, style.animation]);

  const baseStyle: React.CSSProperties = {
    fontFamily: style.fontFamily,
    fontSize: isPreview ? `${style.fontSize * 0.6}px` : `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    color: style.color,
    backgroundColor: style.backgroundColor,
    textAlign: style.textAlign,
    borderRadius: style.borderRadius,
    padding: isPreview ? `${style.padding * 0.6}px` : `${style.padding}px`,
    textTransform: style.uppercase ? "uppercase" : "none",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.3s ease",
    display: "inline-block",
  };

  return (
    <div style={baseStyle} className={animationClass}>
      {style.animation === "typewriter" ? (
        <TypewriterText text={sampleText} />
      ) : (
        sampleText
      )}
    </div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    setDisplayText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return <>{displayText}</>;
}

export function CaptionStyleStep({ formState, updateFormState }: CaptionStyleStepProps) {
  const selectedStyle = formState.captionStyle?.id;

  const handleStyleSelect = (style: CaptionStyle) => {
    updateFormState({
      captionStyle: { id: style.id, name: style.name },
    });
  };

  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Caption Style</h1>
        <p className="mt-1 text-zinc-600">Select a caption style for your videos</p>
      </div>

      {/* Preview Section */}
      <div className="mb-8 rounded-xl bg-zinc-900 p-8">
        <p className="mb-4 text-sm font-medium text-zinc-400">Preview</p>
        <div className="flex min-h-[120px] items-center justify-center">
          {selectedStyle ? (
            <AnimatedCaption 
              style={CaptionStyles.find(s => s.id === selectedStyle)!} 
              isPreview={true}
            />
          ) : (
            <p className="text-zinc-500">Select a caption style to preview</p>
          )}
        </div>
      </div>

      {/* Caption Styles Grid */}
      <div className="grid grid-cols-2 gap-4">
        {CaptionStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => handleStyleSelect(style)}
            className={`flex flex-col items-start rounded-xl border-2 p-4 transition-all hover:border-violet-300 ${
              selectedStyle === style.id
                ? "border-violet-600 bg-violet-50"
                : "border-zinc-200 bg-white"
            }`}
          >
            <div className="mb-3 flex w-full items-center justify-between">
              <span className="font-semibold text-zinc-900">{style.name}</span>
              {selectedStyle === style.id && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            
            {/* Mini Preview */}
            <div className="w-full rounded-lg bg-zinc-900 p-4">
              <AnimatedCaption style={style} isPreview={true} />
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                {style.animation}
              </span>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                {style.uppercase ? "UPPERCASE" : "Normal"}
              </span>
            </div>
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade { animation: fade 0.5s ease forwards; }
        .animate-slide-up { animation: slide-up 0.5s ease forwards; }
        .animate-slide-down { animation: slide-down 0.5s ease forwards; }
        .animate-bounce { animation: bounce 0.6s ease infinite; }
        .animate-scale { animation: scale 0.4s ease forwards; }
        .animate-typewriter { animation: none; }
      `}</style>
    </div>
  );
}
