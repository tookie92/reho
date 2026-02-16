export interface SeriesFormState {
  niche: {
    type: "available" | "custom";
    id: string | null;
    title: string | null;
  };
  language: {
    id: string | null;
    name: string | null;
  };
  voice: {
    id: string | null;
    name: string | null;
    gender: string | null;
  };
  videoStyle: {
    id: string | null;
    name: string | null;
  };
  backgroundMusic: {
    id: string | null;
    name: string | null;
  };
  captionStyle: {
    id: string | null;
    name: string | null;
  };
  platform: {
    youtube: boolean;
    instagram: boolean;
    tiktok: boolean;
    email: boolean;
  };
  schedule: {
    frequency: string | null;
    time: string | null;
    days: string[];
  };
}

export const initialFormState: SeriesFormState = {
  niche: {
    type: "available",
    id: null,
    title: null,
  },
  language: {
    id: null,
    name: null,
  },
  voice: {
    id: null,
    name: null,
    gender: null,
  },
  videoStyle: {
    id: null,
    name: null,
  },
  backgroundMusic: {
    id: null,
    name: null,
  },
  captionStyle: {
    id: null,
    name: null,
  },
  platform: {
    youtube: false,
    instagram: false,
    tiktok: false,
    email: false,
  },
  schedule: {
    frequency: null,
    time: null,
    days: [],
  },
};
