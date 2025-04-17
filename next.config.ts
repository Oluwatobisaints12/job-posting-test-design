import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'd3wo5wojvuv7l.cloudfront.net'
      },
      {
        protocol: 'https',
        hostname: 'd1sfpqaoey1aeo.cloudfront.net'
      },
      {
        protocol: 'https',
        hostname: 'images.spreaker.com'
      },
      {
        protocol: 'https',
        hostname: 'wokpa.s3.amazonaws.com'
      },
      // Add the new hostname here
      {
        protocol: 'https',
        hostname: 'd3t3ozftmdmh3i.cloudfront.net'
      }
    ]
  },
};

export default nextConfig;