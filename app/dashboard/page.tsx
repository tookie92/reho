import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">
        Welcome back, {user?.firstName || "User"}
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Total Videos</h2>
          <p className="mt-2 text-3xl font-bold text-violet-600">0</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Scheduled</h2>
          <p className="mt-2 text-3xl font-bold text-indigo-600">0</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Published</h2>
          <p className="mt-2 text-3xl font-bold text-emerald-600">0</p>
        </div>
      </div>
    </div>
  );
}
