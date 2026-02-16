import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SupabaseProvider } from "@/components/providers/supabase-provider";
import { AuthSync } from "@/components/auth-sync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reho: Ai video Generator and Scheduler Application",
  description: " Reho is a video generator and scheduler application that allows you to create and schedule videos with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SupabaseProvider>
            <AuthSync />
            {children}
          </SupabaseProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
