/** @type {import('next').NextConfig} */

import "dotenv/config";

const bucketHostname = `${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com`;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "", // Optional, usually empty unless a specific port is required
        pathname: "**", // Allows all images from this path
      },
      {
        protocol: "https",
        hostname: bucketHostname,
        port: "", // Optional, usually empty unless a specific port is required
        pathname: "**", // Allows all images from this path
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
