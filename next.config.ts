import type { NextConfig } from "next";

// Static export disabled for dev server (set STATIC_EXPORT=true for static deploy)
// For static deploy: set STATIC_EXPORT=true before next build
const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT === "true" && { output: "export" } as Partial<NextConfig>),
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
