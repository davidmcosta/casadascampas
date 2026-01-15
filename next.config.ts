
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
  ignoreDuringBuilds: process.env.NODE_ENV === "production",
},
 images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
    },
  ],
},
 allowedDevOrigins:
  process.env.NODE_ENV === "development"
    ? [
        'http://192.168.1.217:3000',
        'http://localhost:3000',
      ]
    : undefined,

};

export default nextConfig;
