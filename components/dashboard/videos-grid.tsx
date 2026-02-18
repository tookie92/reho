"use client";

import { useEffect, useState, useCallback } from "react";
import { VideoCard } from "@/components/dashboard/video-card";
import type { Video } from "@/actions/get-videos";
import { supabaseClient } from "@/lib/supabase";

interface VideosGridProps {
  initialVideos: Video[];
}

export function VideosGrid({ initialVideos }: VideosGridProps) {
  const [videos, setVideos] = useState<Video[]>(initialVideos);

  const checkVideoStatus = useCallback(async () => {
    const { data, error } = await supabaseClient
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setVideos(data as Video[]);
    }
  }, []);

  useEffect(() => {
    const hasGeneratingVideos = videos.some((v) => v.status === "generating");
    
    if (!hasGeneratingVideos) return;

    const interval = setInterval(() => {
      checkVideoStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [videos, checkVideoStatus]);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
