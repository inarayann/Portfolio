import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Add path aliases for QuantDex project
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Map @/ for quantdex files to the quantdex app folder
      };
    }
    return config;
  },
};

export default nextConfig;
