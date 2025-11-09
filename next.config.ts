import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper handling of static assets
  images: {
    unoptimized: true, // For Vercel deployment
  },
};

export default nextConfig;
