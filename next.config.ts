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

        // Next.js 16 raised this default from 60s to 4h; kept at the previous
        // value so product images keep refreshing at the same rate.
        minimumCacheTTL: 60,
    },

};
// export default nextConfig;

export default withPWA({
    dest: "public",
    register: true,
    // The PWA plugin is a webpack plugin, so `next build` runs with --webpack while
    // `next dev` runs on Turbopack. The service worker is a build artefact anyway.
    disable: process.env.NODE_ENV === "development",
})(nextConfig);
