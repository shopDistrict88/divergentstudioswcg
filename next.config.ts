import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

// Static export disabled for dev server (set STATIC_EXPORT=true for static deploy)
const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT === "true" &&
    ({ output: "export" } as Partial<NextConfig>)),
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Parent folder (C:\Users\kjwil) has another package-lock.json — pin roots here
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
