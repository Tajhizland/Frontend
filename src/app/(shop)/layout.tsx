"use client"

import "../globals.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import CommonClient from "./CommonClient";
import {NextFont} from "next/dist/compiled/@next/font";
import localFont from "next/font/local";
import {QueryClient, QueryClientProvider} from "react-query";
import AutoLoading from "@/app/(shop)/AutoLoading";
import {Suspense} from "react";
import BottomNavigation from "@/components/BottomNavigation/BottomNavigation";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import InstallPWAButton from "@/components/Pwa/InstallPWAButton";


const myFont: NextFont = localFont({src: '../../fonts/fa/IRANSansWeb.woff2'})


export default function ShopLayout({
                                       children,
                                       params,
                                   }: {
    children: React.ReactNode;
    params: any;
}) {
    const queryClient = new QueryClient();

    return (
        <>
            <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
                <QueryClientProvider client={queryClient}>
                    <Header/>
                    <Suspense>
                        <AutoLoading/>
                    </Suspense>
                    {children}
                    <BottomNavigation/>
                </QueryClientProvider>
                <Footer/>
            </div>
            <CommonClient/>
        </>
    );
}
