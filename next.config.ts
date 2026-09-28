import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/synchrony-study",
  assetPrefix: "/synchrony-study/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;