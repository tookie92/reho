"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export interface Series {
  id: string;
  user_id: string;
  series_name: string;
  niche_type: string | null;
  niche_id: string | null;
  niche_title: string | null;
  language_id: string | null;
  language_name: string | null;
  voice_id: string | null;
  voice_name: string | null;
  voice_gender: string | null;
  video_style_id: string | null;
  video_style_name: string | null;
  background_music_id: string | null;
  background_music_name: string | null;
  caption_style_id: string | null;
  caption_style_name: string | null;
  platform_youtube: boolean;
  platform_instagram: boolean;
  platform_tiktok: boolean;
  platform_email: boolean;
  video_duration: string | null;
  publish_time: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface SeriesFormData {
  niche: { type: "available" | "custom"; id: string | null; title: string | null };
  language: { id: string | null; name: string | null };
  voice: { id: string | null; name: string | null; gender: string | null };
  videoStyle: { id: string | null; name: string | null };
  backgroundMusic: { id: string | null; name: string | null };
  captionStyle: { id: string | null; name: string | null };
  platform: { youtube: boolean; instagram: boolean; tiktok: boolean; email: boolean };
  schedule: { frequency: string | null; time: string | null; days: string[] };
}

export async function getUserSeries(): Promise<Series[]> {
  const { userId } = await auth();
  
  if (!userId) {
    return [];
  }

  const { data, error } = await supabaseAdmin
    .from("series")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching series:", error);
    return [];
  }

  return data || [];
}

export async function getSeriesById(seriesId: string): Promise<Series | null> {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("series")
    .select("*")
    .eq("id", seriesId)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching series:", error);
    return null;
  }

  return data;
}

export async function createSeries(formData: SeriesFormData): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const { data, error } = await supabaseAdmin
    .from("series")
    .insert({
      user_id: userId,
      niche_type: formData.niche.type,
      niche_id: formData.niche.id,
      niche_title: formData.niche.title,
      language_id: formData.language.id,
      language_name: formData.language.name,
      voice_id: formData.voice.id,
      voice_name: formData.voice.name,
      voice_gender: formData.voice.gender,
      video_style_id: formData.videoStyle.id,
      video_style_name: formData.videoStyle.name,
      background_music_id: formData.backgroundMusic.id,
      background_music_name: formData.backgroundMusic.name,
      caption_style_id: formData.captionStyle.id,
      caption_style_name: formData.captionStyle.name,
      platform_youtube: formData.platform.youtube,
      platform_instagram: formData.platform.instagram,
      platform_tiktok: formData.platform.tiktok,
      platform_email: formData.platform.email,
      series_name: formData.schedule.days?.[0] || null,
      video_duration: formData.schedule.frequency,
      publish_time: formData.schedule.time,
      status: "active",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating series:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateSeries(seriesId: string, formData: SeriesFormData): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const { data, error } = await supabaseAdmin
    .from("series")
    .update({
      niche_type: formData.niche.type,
      niche_id: formData.niche.id,
      niche_title: formData.niche.title,
      language_id: formData.language.id,
      language_name: formData.language.name,
      voice_id: formData.voice.id,
      voice_name: formData.voice.name,
      voice_gender: formData.voice.gender,
      video_style_id: formData.videoStyle.id,
      video_style_name: formData.videoStyle.name,
      background_music_id: formData.backgroundMusic.id,
      background_music_name: formData.backgroundMusic.name,
      caption_style_id: formData.captionStyle.id,
      caption_style_name: formData.captionStyle.name,
      platform_youtube: formData.platform.youtube,
      platform_instagram: formData.platform.instagram,
      platform_tiktok: formData.platform.tiktok,
      platform_email: formData.platform.email,
      series_name: formData.schedule.days?.[0] || null,
      video_duration: formData.schedule.frequency,
      publish_time: formData.schedule.time,
      updated_at: new Date().toISOString(),
    })
    .eq("id", seriesId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating series:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateSeriesStatus(seriesId: string, status: string) {
  const { userId } = await auth();
  
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabaseAdmin
    .from("series")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", seriesId)
    .eq("user_id", userId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function deleteSeries(seriesId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabaseAdmin
    .from("series")
    .delete()
    .eq("id", seriesId)
    .eq("user_id", userId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
