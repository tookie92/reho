export interface Language {
  id: string;
  language: string;
  countryCode: string;
  countryFlag: string;
}

export interface Voice {
  id: string;
  model: string;
  modelName: string;
  preview: string;
  gender: string;
}

export const Languages: Language[] = [
  { id: "en-US", language: "English (US)", countryCode: "US", countryFlag: "🇺🇸" },
  { id: "es-MX", language: "Spanish (MX)", countryCode: "MX", countryFlag: "🇲🇽" },
  { id: "es-ES", language: "Spanish (ES)", countryCode: "ES", countryFlag: "🇪🇸" },
  { id: "de-DE", language: "German", countryCode: "DE", countryFlag: "🇩🇪" },
  { id: "fr-FR", language: "French", countryCode: "FR", countryFlag: "🇫🇷" },
  { id: "nl-NL", language: "Dutch", countryCode: "NL", countryFlag: "🇳🇱" },
  { id: "it-IT", language: "Italian", countryCode: "IT", countryFlag: "🇮🇹" },
  { id: "ja-JP", language: "Japanese", countryCode: "JP", countryFlag: "🇯🇵" },
  { id: "pt-BR", language: "Portuguese (BR)", countryCode: "BR", countryFlag: "🇧🇷" },
  { id: "ko-KR", language: "Korean", countryCode: "KR", countryFlag: "🇰🇷" },
];

export const Voices: Voice[] = [
  { 
    id: "aura-2-odysseus-en",
     model: "deepgram",
      modelName: "Aura 2 - Odysseus",
       preview: "/voice/deepgram-aura-2-odysseus-en.wav", 
    gender: "male" 
  },

  { 
    id: "aura-2-thalia-en",
       model: "deepgram",
      modelName: "Aura 2 - Thalia",
      preview: "/voice/deepgram-aura-2-thalia-en.wav", 
      gender: "female" 
  },

  { 
    id: "aura-2-amalthea-en",
     model: "deepgram",
      modelName: "Aura 2 - Amalthea", 
      preview: "/voice/deepgram-aura-2-amalthea-en.wav", 
    gender: "female" 
  },

  { 
    id: "aura-2-andromeda-en",
     model: "deepgram",
      modelName: "Aura 2 - Andromeda",
       preview: "/voice/deepgram-aura-2-andromeda-en.wav", 
    gender: "female" 
  },

  { 
    id: "aura-2-apollo-en",
     model: "deepgram",
      modelName: "Aura 2 - Apollo",
       preview: "/voice/deepgram-aura-2-apollo-en.wav", 
    gender: "male"
   },
];
