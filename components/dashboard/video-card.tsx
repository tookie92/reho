"use client";

import { useState } from "react";
import { Play, Clock, MoreVertical, Trash2, Eye, Download, Loader2 } from "lucide-react";
import type { Video } from "@/actions/get-videos";

interface VideoCardProps {
  video: Video;
}

const defaultThumbnail = "/video-style/realistic.png";

export function VideoCard({ video }: VideoCardProps) {
  const [showPopover, setShowPopover] = useState(false);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getThumbnail = () => {
    if (video.images && video.images.length > 0) {
      return video.images[0].url;
    }
    return defaultThumbnail;
  };

  const isGenerating = video.status === "generating";

  const getStatusBadge = () => {
    switch (video.status) {
      case "completed":
        return { label: "Completed", className: "bg-green-500" };
      case "generating":
        return { label: "Generating", className: "bg-blue-500" };
      case "pending":
        return { label: "Pending", className: "bg-orange-500" };
      case "failed":
        return { label: "Failed", className: "bg-red-500" };
      default:
        return { label: video.status, className: "bg-zinc-500" };
    }
  };

  const thumbnail = getThumbnail();
  const statusBadge = getStatusBadge();

  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
        <img
          src={thumbnail}
          alt={video.title || "Video"}
          className="h-full w-full object-cover"
        />

        {/* Loading Overlay */}
        {isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
            <Loader2 className="h-10 w-10 animate-spin text-white" />
            <span className="mt-2 text-sm font-medium text-white">Generating...</span>
          </div>
        )}
        
        {/* Play Button Overlay (only when not generating) */}
        {!isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 transition-opacity group-hover:opacity-100">
              <Play className="ml-1 h-5 w-5 text-zinc-700 fill-zinc-700" />
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute left-3 top-3">
          <span className={`rounded-full ${statusBadge.className} px-3 py-1 text-xs font-medium text-white`}>
            {statusBadge.label}
          </span>
        </div>

        {/* More Options Button */}
        <button
          onClick={() => setShowPopover(!showPopover)}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-zinc-700 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        
        {/* Popover */}
        {showPopover && (
          <div className="absolute right-3 top-12 z-10 w-40 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg">
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
            >
              <Eye className="h-4 w-4" />
              View
            </button>
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 font-semibold text-zinc-900 line-clamp-2">
          {video.title || "Untitled Video"}
        </h3>
        <div className="flex items-center gap-1 text-sm text-zinc-500">
          <Clock className="h-3 w-3" />
          {formatDate(video.created_at)}
        </div>
      </div>
    </div>
  );
}
