import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
    images: { 
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tajhizland.com',
            }, {
                protocol: 'https',
                hostname: 'c778665.parspack.net',
            },
            {
                protocol: 'https',
                hostname: "images.pexels.com",
            }, {
                protocol: 'https',
                hostname: "images.unsplash.com",
            }, {
                protocol: 'https',
                hostname: "Trustseal.eNamad.ir",
            }, {
                protocol: 'https',
                hostname: "logo.samandehi.ir",
            },
        ],
    },

};
// export default nextConfig;

export default withPWA({
    dest: "public",
    register: true,

})(nextConfig);
