import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper handling of static assets
  images: {
    unoptimized: true, // For Vercel deployment
  },
  // Disable Turbopack completely to avoid compatibility issues
  experimental: {
    // This will force webpack usage
  },
  // Add output configuration for better Vercel compatibility
  output: 'standalone',
};

export default nextConfig;
