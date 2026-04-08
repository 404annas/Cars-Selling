import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
