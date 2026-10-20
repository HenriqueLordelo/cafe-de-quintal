import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  experimental: {
    cpus: 1,
    workerThreads: false,
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    qualities: [75, 85],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
