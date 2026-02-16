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
