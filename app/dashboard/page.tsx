import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getUserSeries, type Series } from "@/actions/get-series";
import { SeriesGrid } from "@/components/dashboard/series-grid";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();
  const series = await getUserSeries();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">
            Welcome back, {user?.firstName || "User"}
          </h1>
          <p className="mt-1 text-zinc-600">
            Manage your video series and generate new content
          </p>
        </div>
        
        <Link
          href="/dashboard/create"
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
        >
          <Plus className="h-4 w-4" />
          Create Series
        </Link>
      </div>

      {series.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 py-16">
          <div className="mb-4 rounded-full bg-zinc-100 p-4">
            <Plus className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-zinc-900">No series yet</h3>
          <p className="mb-4 text-sm text-zinc-500">
            Create your first video series to get started
          </p>
          <Link
            href="/dashboard/create"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700"
          >
            Create Series
          </Link>
        </div>
      ) : (
        <SeriesGrid series={series} />
      )}
    </div>
  );
}
