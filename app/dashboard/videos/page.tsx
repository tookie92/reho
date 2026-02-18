import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getUserVideos } from "@/actions/get-videos";
import { VideosGrid } from "@/components/dashboard/videos-grid";
import { Plus, RefreshCw } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const user = await currentUser();
  const videos = await getUserVideos();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">
            Videos
          </h1>
          <p className="mt-1 text-zinc-600">
            View and manage your generated videos
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/videos"
            className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
          >
            <Plus className="h-4 w-4" />
            Go to Series
          </Link>
        </div>
      </div>

      {videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 py-16">
          <div className="mb-4 rounded-full bg-zinc-100 p-4">
            <Plus className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-zinc-900">No videos yet</h3>
          <p className="mb-4 text-sm text-zinc-500">
            Generate your first video from a series
          </p>
          <Link
            href="/dashboard"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700"
          >
            Go to Series
          </Link>
        </div>
      ) : (
        <VideosGrid initialVideos={videos} />
      )}
    </div>
  );
}
