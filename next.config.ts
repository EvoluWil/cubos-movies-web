import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-d6d7ad948c8e45e9b888931b201ecf53.r2.dev',
      },
    ],
  },
};

export default nextConfig;
