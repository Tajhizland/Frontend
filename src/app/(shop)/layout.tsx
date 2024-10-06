"use client"

import {Poppins} from "next/font/google";
import "../globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/(shop)/SiteHeader";
import CommonClient from "./CommonClient";
import {NextFont} from "next/dist/compiled/@next/font";
import localFont from "next/font/local";
import {QueryClient, QueryClientProvider} from "react-query";
import AutoLoading from "@/app/(shop)/AutoLoading";
import {Suspense} from "react";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

const myFont: NextFont = localFont({src: '../../fonts/fa/IRANSansWeb.woff2'})
const myFont2: NextFont = localFont({src: '../../fonts/fa/IRANSansWeb(FaNum).woff2'})

export default function RootLayout({
                                       children,
                                       params,
                                   }: {
    children: React.ReactNode;
    params: any;
}) {
    const queryClient = new QueryClient();

    return (
        <html lang="fa" dir="rtl" className={[myFont.className, myFont2.className].join(" ")}>
        <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <div>
            <QueryClientProvider client={queryClient}>
                <SiteHeader/>
                <Suspense>
                    <AutoLoading/>
                </Suspense>
                {children}
            </QueryClientProvider>
            <Footer/>
        </div>
        <CommonClient/>
        </body>
        </html>
    );
}
