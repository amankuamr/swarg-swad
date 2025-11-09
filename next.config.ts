import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper handling of static assets
  images: {
    unoptimized: true, // For Vercel deployment
  },
  // Force webpack usage to avoid Turbopack issues
  turbopack: {},
  webpack: (config, { dev }) => {
    if (!dev) {
      // Production-specific webpack config
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
