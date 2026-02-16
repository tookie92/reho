"use client";

import Link from "next/link";
import { useAuth, UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Play } from "lucide-react";

export function Header() {
  const { userId } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-black/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
            <Play className="h-5 w-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Reho</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            Features
          </Link>
          <Link href="#platforms" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            Platforms
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            Pricing
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <SignedIn>
            <Link href="/dashboard" className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 sm:block">
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 sm:block">
                Sign In
              </button>
            </SignInButton>
            <Link href="/dashboard" className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
              Dashboard
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
