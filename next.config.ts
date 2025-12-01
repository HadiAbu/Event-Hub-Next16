import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  /* config options here */
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
