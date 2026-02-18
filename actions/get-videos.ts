"use server";

import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface Video {
  id: string;
  series_id: string;
  user_id: string;
  title: string | null;
  script: unknown;
  voice_data: unknown;
  caption: unknown;
  images: { url: string }[] | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function getUserVideos(): Promise<Video[]> {
  const { userId } = await auth();
  
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }

  return data || [];
}

export async function getVideosBySeriesId(seriesId: string): Promise<Video[]> {
  const { userId } = await auth();
  
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("series_id", seriesId)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }

  return data || [];
}
