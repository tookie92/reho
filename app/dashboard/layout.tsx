import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { 
  Play, 
  Plus, 
  Film, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Zap,
  User,
  LogOut
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white">
        {/* Logo Section */}
        <div className="flex h-16 items-center gap-3 border-b border-zinc-200 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
            <Play className="h-5 w-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900">Reho</span>
        </div>

        {/* Create New Series Button */}
        <div className="border-b border-zinc-200 p-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800">
            <Plus className="h-5 w-5" />
            Create New Series
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/dashboard" 
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <Film className="h-6 w-6" />
                Series Videos
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/guides" 
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <BookOpen className="h-6 w-6" />
                Guides
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/billing" 
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <CreditCard className="h-6 w-6" />
                Billing
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/settings" 
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <Settings className="h-6 w-6" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-zinc-200 p-4">
          <Link 
            href="/dashboard/upgrade" 
            className="mb-3 flex items-center gap-3 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-base font-semibold text-white"
          >
            <Zap className="h-6 w-6" />
            Upgrade Plan
          </Link>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900">
            <User className="h-6 w-6" />
            Profile Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-end border-b border-zinc-200 bg-white px-8">
          <div className="flex items-center gap-4">
            {user?.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt={user.fullName || "User"} 
                className="h-9 w-9 rounded-full"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200">
                <User className="h-5 w-5 text-zinc-600" />
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
