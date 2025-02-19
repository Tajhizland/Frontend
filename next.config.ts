import type { NextConfig } from "next";
import withPWA from '@ducanh2912/next-pwa';

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
export default withPWA({
    dest: "public",
    register: true,

})(nextConfig);
// export default nextConfig;
