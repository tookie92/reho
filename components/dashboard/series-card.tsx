"use client";

import { useState } from "react";
import { 
  MoreVertical, 
  Play, 
  Pause, 
  Trash2, 
  Edit3, 
  Eye,
  Youtube,
  Instagram,
  Mail,
  Clock,
  Check,
  X
} from "lucide-react";
import type { Series } from "@/actions/get-series";
import { updateSeriesStatus, deleteSeries } from "@/actions/get-series";

const videoStyleImages: Record<string, string> = {
  realistic: "/video-style/realistic.png",
  gta: "/video-style/gta.png",
  cyberpunk: "/video-style/cyberpunk.png",
  cinematic: "/video-style/cinematic.png",
  anime: "/video-style/anime.png",
  "3d-render": "/video-style/3d-render.png",
};

interface SeriesCardProps {
  series: Series;
  onEdit: (series: Series) => void;
  onViewVideos: (series: Series) => void;
  onGenerateVideo: (series: Series) => void;
}

export function SeriesCard({ series, onEdit, onViewVideos, onGenerateVideo }: SeriesCardProps) {
  const [showPopover, setShowPopover] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [localSeries, setLocalSeries] = useState(series);
  
  const thumbnailSrc = videoStyleImages[localSeries.video_style_id || ""] || "/video-style/realistic.png";
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPlatformIcons = () => {
    const icons = [];
    if (localSeries.platform_youtube) icons.push({ Icon: Youtube, color: "text-red-500", label: "YouTube" });
    if (localSeries.platform_instagram) icons.push({ Icon: Instagram, color: "text-pink-500", label: "Instagram" });
    if (localSeries.platform_tiktok) icons.push({ Icon: Mail, color: "text-black", label: "TikTok" });
    if (localSeries.platform_email) icons.push({ Icon: Mail, color: "text-blue-500", label: "Email" });
    return icons;
  };

  const handleStatusToggle = async () => {
    setIsUpdating(true);
    const newStatus = localSeries.status === "active" ? "paused" : "active";
    const result = await updateSeriesStatus(localSeries.id, newStatus);
    if (!result.error) {
      setLocalSeries({ ...localSeries, status: newStatus });
    }
    setIsUpdating(false);
    setShowPopover(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this series? This action cannot be undone.")) return;
    setIsUpdating(true);
    await deleteSeries(localSeries.id);
    setIsUpdating(false);
    setShowPopover(false);
    window.location.reload();
  };

  const platformIcons = getPlatformIcons();

  const getStatusBadge = () => {
    switch (localSeries.status) {
      case "active":
        return { label: "Active", className: "bg-green-500" };
      case "paused":
        return { label: "Paused", className: "bg-yellow-500" };
      case "pending":
        return { label: "Pending", className: "bg-orange-500" };
      default:
        return { label: "Active", className: "bg-green-500" };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
        <img
          src={thumbnailSrc}
          alt={localSeries.video_style_name || "Video style"}
          className="h-full w-full object-cover"
        />
        
        {/* Edit Button on Thumbnail */}
        <button
          onClick={() => onEdit(localSeries)}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-zinc-700 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
        >
          <Edit3 className="h-4 w-4" />
        </button>
        
        {/* Status Badge */}
        {statusBadge && (
          <div className="absolute left-3 top-3">
            <span className={`rounded-full ${statusBadge.className} px-3 py-1 text-xs font-medium text-white`}>
              {statusBadge.label}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Series Name & Options */}
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-zinc-900">{localSeries.series_name || "Untitled Series"}</h3>
            <p className="text-sm text-zinc-500">Created {formatDate(localSeries.created_at)}</p>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowPopover(!showPopover)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            
            {/* Popover */}
            {showPopover && (
              <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg">
                <button
                  onClick={() => { onEdit(localSeries); setShowPopover(false); }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={handleStatusToggle}
                  disabled={isUpdating}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
                >
                  {localSeries.status === "active" ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Resume
                    </>
                  )}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isUpdating}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Platform Icons */}
        <div className="mb-4 flex gap-2">
          {platformIcons.map(({ Icon, color, label }) => (
            <div key={label} className={`rounded-md bg-zinc-100 p-1.5 ${color}`} title={label}>
              <Icon className="h-4 w-4" />
            </div>
          ))}
          {localSeries.publish_time && (
            <div className="flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
              <Clock className="h-3 w-3" />
              {localSeries.publish_time}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewVideos(localSeries)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            <Eye className="h-4 w-4" />
            View Videos
          </button>
          <button
            onClick={() => onGenerateVideo(localSeries)}
            disabled={localSeries.status === "paused"}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:bg-zinc-300"
          >
            <Play className="h-4 w-4" />
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
