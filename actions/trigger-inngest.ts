"use server";

import { Inngest } from "inngest";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

const inngest = new Inngest({
  id: "reho-app",
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function triggerVideoGeneration(seriesId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("User not authenticated");
  }

  // First, fetch the series to get the title
  const { data: series } = await supabase
    .from("series")
    .select("series_name")
    .eq("id", seriesId)
    .single();

  // Create a video record with "generating" status
  const { data: video, error: insertError } = await supabase
    .from("videos")
    .insert({
      series_id: seriesId,
      user_id: userId,
      title: series?.series_name ? `${series.series_name} - Generating...` : "Generating video...",
      status: "generating",
    })
    .select()
    .single();

  if (insertError) {
    console.error("Error creating video record:", insertError);
    throw new Error("Failed to create video record");
  }

  // Trigger the Inngest event
  await inngest.send({
    name: "video/generate",
    data: { seriesId },
  });
  
  console.log("Triggered video generation for series:", seriesId);
  
  return video;
}
