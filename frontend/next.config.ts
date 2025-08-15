import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['example.com'],
    remotePatterns: [
    {
       protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/menu/**",
    },
  ],
  },
};

export default nextConfig;
