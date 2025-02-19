import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tajhizland.com',
            },  {
                protocol: 'https',
                hostname: 'c778665.parspack.net',
            },
            {
                protocol: 'https',
                hostname: "images.pexels.com",
            },{
                protocol: 'https',
                hostname: "images.unsplash.com",
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
