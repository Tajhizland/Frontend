import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
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

};
export default withPWAInit({
    dest: "public",
    register: true,

})(nextConfig);
