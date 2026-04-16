import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack enabled by default via --turbopack flag in dev
  images: {
    formats: ["image/avif", "image/webp"],
    // Add your image domains here when needed:
    // remotePatterns: [{ protocol: "https", hostname: "your-domain.com" }],
  },
  // Strict mode for catching React issues early
  reactStrictMode: true,
};

export default nextConfig;
