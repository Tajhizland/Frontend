import localFont from 'next/font/local'
import {NextFont} from "next/dist/compiled/@next/font";
import type {Metadata} from "next";
import "./globals.css";
import Script from "next/script";
import GoftinoContainer from "@/components/Goftino/GoftinoContainer";
import Providers from "@/app/Providers";


const myFont: NextFont = localFont({src: '../fonts/fa/IRANSansWeb.woff2'})

// Next.js 16 rejects arbitrary named exports from a route module; nothing
// imported this, so it stays module-local.
const SITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://tajhizland.com";

/**
 * متادیتای پایه‌ی کل سایت.
 *
 * metadataBase لازم است تا آدرس تصاویر og/twitter در زیرصفحه‌ها مطلق شود؛
 * بدون آن گوگل و شبکه‌های اجتماعی آدرس نسبی را نمی‌توانند بخوانند.
 *
 * آیکن‌ها هم اینجا تعریف شده‌اند تا favicon مربع و پایدار در هر صفحه اعلام شود؛
 * گوگل favicon غیرمربع یا با آدرس ناپایدار را نادیده می‌گیرد.
 */
export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "تجهیزلند",
        template: "%s | تجهیزلند",
    },
    applicationName: "تجهیزلند",
    icons: {
        icon: [
            {url: "/favicon.ico", sizes: "any"},
            {url: "/favicon-48.png", type: "image/png", sizes: "48x48"},
            {url: "/icons/192.png", type: "image/png", sizes: "192x192"},
            {url: "/logo.png", type: "image/png", sizes: "512x512"},
        ],
        shortcut: ["/favicon.ico"],
        apple: [{url: "/icons/180.png", sizes: "180x180", type: "image/png"}],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir={"rtl"}>
        <head>
            <Script src={"/js/goftino.js"}></Script>
            <link rel="manifest" href="/manifest.json"/>
            <meta name="theme-color" content="#fff"/>
            <meta name="apple-mobile-web-app-status-bar" content="#fff"/>
        </head>
        <body
            className={`${myFont.className}`}
        >
        <Providers>
            <GoftinoContainer />
            {children}
        </Providers>
        </body>
        </html>
    );
}
