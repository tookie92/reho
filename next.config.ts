import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@clerk/nextjs"],
  turbopack: {},
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.com",
      },
    ],
  }
};

export default nextConfig;
