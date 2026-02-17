"use client";

import { useRouter } from "next/navigation";
import { SeriesCard } from "@/components/dashboard/series-card";
import type { Series } from "@/actions/get-series";
import { triggerVideoGeneration } from "@/actions/trigger-inngest";

interface SeriesGridProps {
  series: Series[];
}

export function SeriesGrid({ series }: SeriesGridProps) {
  const router = useRouter();

  const handleEdit = (seriesItem: Series) => {
    router.push(`/dashboard/create?id=${seriesItem.id}`);
  };

  const handleViewVideos = (seriesItem: Series) => {
    console.log("View videos for series:", seriesItem.id);
    alert(`View videos for: ${seriesItem.series_name} - Coming soon!`);
  };

  const handleGenerateVideo = async (seriesItem: Series) => {
    try {
      await triggerVideoGeneration(seriesItem.id);
      alert(`Video generation started for: ${seriesItem.series_name}!`);
    } catch (error) {
      console.error("Error triggering video generation:", error);
      alert("Failed to start video generation");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {series.map((s) => (
        <SeriesCard
          key={s.id}
          series={s}
          onEdit={handleEdit}
          onViewVideos={handleViewVideos}
          onGenerateVideo={handleGenerateVideo}
        />
      ))}
    </div>
  );
}
