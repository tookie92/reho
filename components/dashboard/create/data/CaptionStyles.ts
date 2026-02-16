export interface CaptionStyle {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  backgroundColor: string;
  textAlign: "left" | "center" | "right";
  borderRadius: number;
  padding: number;
  animation: "fade" | "slide-up" | "slide-down" | "typewriter" | "bounce" | "scale";
  uppercase: boolean;
}

export const CaptionStyles: CaptionStyle[] = [
  {
    id: "modern",
    name: "Modern",
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: 700,
    color: "#FFFFFF",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    textAlign: "center",
    borderRadius: 12,
    padding: 16,
    animation: "fade",
    uppercase: false,
  },
  {
    id: "bold",
    name: "Bold Impact",
    fontFamily: "Inter",
    fontSize: 32,
    fontWeight: 900,
    color: "#FFFFFF",
    backgroundColor: "rgba(139, 92, 246, 0.9)",
    textAlign: "center",
    borderRadius: 8,
    padding: 20,
    animation: "slide-up",
    uppercase: true,
  },
  {
    id: "minimal",
    name: "Minimal",
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: 400,
    color: "#FFFFFF",
    backgroundColor: "transparent",
    textAlign: "center",
    borderRadius: 0,
    padding: 12,
    animation: "typewriter",
    uppercase: false,
  },
  {
    id: "neon",
    name: "Neon",
    fontFamily: "Inter",
    fontSize: 30,
    fontWeight: 700,
    color: "#00FF00",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    textAlign: "center",
    borderRadius: 16,
    padding: 18,
    animation: "bounce",
    uppercase: false,
  },
  {
    id: "cinematic",
    name: "Cinematic",
    fontFamily: "Inter",
    fontSize: 26,
    fontWeight: 600,
    color: "#FCD34D",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    textAlign: "center",
    borderRadius: 4,
    padding: 14,
    animation: "slide-down",
    uppercase: true,
  },
  {
    id: "bubble",
    name: "Speech Bubble",
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: 500,
    color: "#000000",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    borderRadius: 24,
    padding: 16,
    animation: "scale",
    uppercase: false,
  },
];
