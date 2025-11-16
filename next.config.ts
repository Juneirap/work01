import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "*.pic.in.th", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
