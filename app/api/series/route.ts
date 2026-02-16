import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

   
    const body = await req.json();
    const {
      niche,
      language,
      voice,
      videoStyle,
      backgroundMusic,
      captionStyle,
      platform,
      schedule,
    } = body;

    const { data, error } = await supabaseAdmin
      .from("series")
      .insert({
        user_id: userId,
        niche_type: niche.type,
        niche_id: niche.id,
        niche_title: niche.title,
        language_id: language.id,
        language_name: language.name,
        voice_id: voice.id,
        voice_name: voice.name,
        voice_gender: voice.gender,
        video_style_id: videoStyle.id,
        video_style_name: videoStyle.name,
        background_music_id: backgroundMusic.id,
        background_music_name: backgroundMusic.name,
        caption_style_id: captionStyle.id,
        caption_style_name: captionStyle.name,
        platform_youtube: platform.youtube,
        platform_instagram: platform.instagram,
        platform_tiktok: platform.tiktok,
        platform_email: platform.email,
        series_name: schedule.days?.[0] || null,
        video_duration: schedule.frequency,
        publish_time: schedule.time,
        status: "active",
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving series:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
