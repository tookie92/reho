-- Create videos table
CREATE TABLE public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  series_id VARCHAR NOT NULL,
  user_id VARCHAR NOT NULL,
  title VARCHAR,
  script JSONB,
  voice_data JSONB,
  caption JSONB,
  images JSONB,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own videos
CREATE POLICY "Users can read their own videos"
  ON public.videos
  FOR SELECT
  USING (auth.uid()::VARCHAR = user_id);

-- Create policy for users to insert their own videos
CREATE POLICY "Users can insert their own videos"
  ON public.videos
  FOR INSERT
  WITH CHECK (auth.uid()::VARCHAR = user_id);

-- Create policy for users to update their own videos
CREATE POLICY "Users can update their own videos"
  ON public.videos
  FOR UPDATE
  USING (auth.uid()::VARCHAR = user_id);

-- Create index on series_id for faster queries
CREATE INDEX idx_videos_series_id ON public.videos(series_id);

-- Create index on user_id for faster queries
CREATE INDEX idx_videos_user_id ON public.videos(user_id);
