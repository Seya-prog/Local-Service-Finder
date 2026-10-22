import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  serverExternalPackages: ["@vercel/postgres", "pg"],
  typescript: {
    // Type checking is independently verified via `npm run typecheck`
    ignoreBuildErrors: true,
  },
}

export default nextConfig
