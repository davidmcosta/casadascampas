
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
 images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
    },
  ],
},
 allowedDevOrigins: [
    'http://192.168.1.217:3000', // O teu IP local + porta
    'http://localhost:3000',      // Opcional: localhost
  ],

};

export default nextConfig;
