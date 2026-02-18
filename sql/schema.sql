-- Series table to store all form data
CREATE TABLE public.series (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  
  -- Niche
  niche_type TEXT CHECK (niche_type IN ('available', 'custom')),
  niche_id TEXT,
  niche_title TEXT,
  
  -- Language & Voice
  language_id TEXT,
  language_name TEXT,
  voice_id TEXT,
  voice_name TEXT,
  voice_gender TEXT,
  
  -- Video Style
  video_style_id TEXT,
  video_style_name TEXT,
  
  -- Background Music
  background_music_id TEXT,
  background_music_name TEXT,
  
  -- Caption Style
  caption_style_id TEXT,
  caption_style_name TEXT,
  
  -- Platform (stored as JSON or individual columns)
  platform_youtube BOOLEAN DEFAULT FALSE,
  platform_instagram BOOLEAN DEFAULT FALSE,
  platform_tiktok BOOLEAN DEFAULT FALSE,
  platform_email BOOLEAN DEFAULT FALSE,
  
  -- Schedule
  series_name TEXT,
  video_duration TEXT CHECK (video_duration IN ('30-50', '60-70')),
  publish_time TEXT,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.series ENABLE ROW LEVEL SECURITY;

-- RLS Policies (allow authenticated users to manage their own series)
CREATE POLICY "Users can view own series" ON public.series
  FOR SELECT USING (user_id = user_id);

CREATE POLICY "Users can insert own series" ON public.series
  FOR INSERT WITH CHECK (user_id = user_id);

CREATE POLICY "Users can update own series" ON public.series
  FOR UPDATE USING (user_id = user_id);

CREATE POLICY "Users can delete own series" ON public.series
  FOR DELETE USING (user_id = user_id);

-- Create indexes
CREATE INDEX idx_series_user_id ON public.series(user_id);
CREATE INDEX idx_series_status ON public.series(status);
CREATE INDEX idx_series_created_at ON public.series(created_at DESC);

-- Videos table to store generated video assets
CREATE TABLE public.videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  series_id UUID REFERENCES public.series(id) ON DELETE CASCADE,
  
  -- Video metadata
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  
  -- Script
  script JSONB,
  
  -- Voiceover
  voice_url TEXT,
  voice_duration INTEGER,
  voice_model TEXT,
  
  -- Caption
  caption_text TEXT,
  caption_timestamps JSONB,
  
  -- Images
  images JSONB,
  
  -- Final video URL (when assembled)
  video_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for videos
CREATE POLICY "Users can view own videos" ON public.videos
  FOR SELECT USING (
    series_id IN (SELECT id FROM public.series WHERE user_id = user_id)
  );

CREATE POLICY "Users can insert own videos" ON public.videos
  FOR INSERT WITH CHECK (
    series_id IN (SELECT id FROM public.series WHERE user_id = user_id)
  );

CREATE POLICY "Users can update own videos" ON public.videos
  FOR UPDATE USING (
    series_id IN (SELECT id FROM public.series WHERE user_id = user_id)
  );

CREATE POLICY "Users can delete own videos" ON public.videos
  FOR DELETE USING (
    series_id IN (SELECT id FROM public.series WHERE user_id = user_id)
  );

-- Create indexes for videos
CREATE INDEX idx_videos_series_id ON public.videos(series_id);
CREATE INDEX idx_videos_status ON public.videos(status);
CREATE INDEX idx_videos_created_at ON public.videos(created_at DESC);
