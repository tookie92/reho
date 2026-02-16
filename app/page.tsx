import Link from "next/link";
import { Play, Youtube, Instagram, Mail, Calendar, Sparkles, Clock, BarChart3, Zap, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-900 dark:to-zinc-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
              <Play className="h-5 w-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Reho</span>
          </div>
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
            <Link href="/login" className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 sm:block">
              Sign In
            </Link>
            <Link href="/dashboard" className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-4 py-1.5 text-sm dark:border-zinc-800 dark:bg-zinc-800/50">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <span className="text-zinc-700 dark:text-zinc-300">AI-Powered Video Generation</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
              Create & Schedule AI Videos
              <span className="block text-violet-600 dark:text-violet-400">For Every Platform</span>
            </h1>
            <p className="mb-10 text-lg text-zinc-600 dark:text-zinc-400">
              Reho lets you auto-generate stunning short videos using AI and schedule them across YouTube, Instagram, TikTok, and Email—all from one dashboard.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/dashboard" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-violet-600 px-8 text-sm font-medium text-white transition-all hover:bg-violet-700 hover:scale-105">
                Start Free Trial
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link href="#demo" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-8 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800">
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Platform Icons */}
          <div className="mt-16 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/20">
                <Youtube className="h-6 w-6 text-red-600" />
              </div>
              <span className="text-xs font-medium text-zinc-500">YouTube</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
                <Instagram className="h-6 w-6 text-pink-600" />
              </div>
              <span className="text-xs font-medium text-zinc-500">Instagram</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black dark:bg-zinc-800">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-zinc-500">TikTok</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/20">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-zinc-500">Email</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Powerful features to streamline your video creation and scheduling workflow
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/20">
                <Sparkles className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">AI Video Generation</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Transform your ideas into stunning short videos with our advanced AI. Just describe what you want and let Reho do the rest.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/20">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">Smart Scheduling</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Schedule your videos to go live at the optimal times across all platforms. Set it once, and we handle the rest.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/20">
                <Zap className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">Auto-Post to All</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                One video, every platform. Automatically adapt and post to YouTube, Instagram, TikTok, and Email campaigns.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/20">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">Bulk Scheduling</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Create and queue multiple videos at once. Plan your entire month of content in one sitting.
              </p>
            </div>
            {/* Feature 5 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/20">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">Analytics Dashboard</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Track performance across all platforms from one unified dashboard. Make data-driven decisions.
              </p>
            </div>
            {/* Feature 6 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-900/20">
                <Play className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">Video Templates</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Start with professionally designed templates. Customize them with your brand colors, fonts, and messaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 px-8 py-16 text-center sm:px-16 sm:py-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgNHYyaC0ydi0yaDJ6bTQtOGgydjJoLTJ2LTJ6bTgtOGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Transform Your Video Strategy?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-violet-100">
                Join thousands of creators who are already using Reho to automate their video content across all platforms.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/dashboard" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-violet-600 transition-all hover:bg-violet-50 hover:scale-105">
                  Start Your Free Trial
                </Link>
                <Link href="#contact" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-8 text-sm font-medium text-white transition-colors hover:bg-white/10">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-6">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                  <Play className="h-5 w-5 text-white fill-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">Reho</span>
              </div>
              <p className="mt-4 max-w-xs text-sm text-zinc-600 dark:text-zinc-400">
                AI-powered video generation and scheduling for creators and businesses. Post everywhere, effortlessly.
              </p>
              <div className="mt-6 flex gap-4">
                <a href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
                <a href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Features</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Templates</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Integrations</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">API</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">About</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Blog</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Careers</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Press Kit</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Partners</Link></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Community</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Webinars</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Status</Link></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Cookie Policy</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">GDPR</Link></li>
                <li><Link href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">DMCA</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800 md:flex-row">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} Reho. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
              <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">Status</Link>
              <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">Security</Link>
              <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
