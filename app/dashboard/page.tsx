import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">
        Welcome back, {user?.firstName || "User"}
      </h1>
     
    </div>
  );
}
