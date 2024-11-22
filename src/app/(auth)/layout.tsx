"use client"
import "../globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import localFont from 'next/font/local'
import {NextFont} from "next/dist/compiled/@next/font";
import {QueryClient, QueryClientProvider} from "react-query";
import SiteHeader from "@/app/(shop)/SiteHeader";
import {Suspense} from "react";
import AutoLoading from "@/app/(shop)/AutoLoading";
import BottomNavigation from "@/components/BottomNavigation/BottomNavigation";
import Footer from "@/shared/Footer/Footer";
import CommonClient from "@/app/(shop)/CommonClient";

const myFont: NextFont = localFont({src: '../../fonts/fa/IRANSansWeb.woff2'})
const myFont2: NextFont = localFont({src: '../../fonts/fa/IRANSansWeb(FaNum).woff2'})


export default function AdminLayout({
                                        children,
                                        params,
                                    }: {
    children: React.ReactNode;
    params: any;
}) {


    const queryClient = new QueryClient();

    return (
        <>
            <html lang="fa" dir="rtl" className={`h-screen ${myFont.className} ${myFont2.className}`}>
            <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
            <div className={"h-full flex justify-center items-center"}>
                <QueryClientProvider client={queryClient}>
                     <Suspense>
                        <AutoLoading/>
                    </Suspense>
                    {children}
                </QueryClientProvider>
             </div>
            <CommonClient/>
            </body>
            </html>
        </>
    );
}
