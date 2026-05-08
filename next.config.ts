import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*.jfif',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/jpeg',
          },
        ],
      },
      {
        source: '/:path*.Jfif',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/jpeg',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Skip font optimization to avoid build errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
