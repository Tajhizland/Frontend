"use client"

import "../globals.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import {NextFont} from "next/dist/compiled/@next/font";
import localFont from "next/font/local";
import AutoLoading from "@/app/(shop)/AutoLoading";
import {Suspense} from "react";
import Footprint from "@/components/Footprint/Footprint";
import TajhizcastHeader from "@/components/Header/TajhizcastHeader";


const myFont: NextFont = localFont({src: '../../fonts/fa/IRANSansWeb.woff2'})


export default function ShopLayout({
                                       children,
                                       params,
                                   }: {
    children: React.ReactNode;
    params: any;
}) {

    return (
        <>
            <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
                    <TajhizcastHeader/>
                    <Suspense>
                        <AutoLoading/>
                    </Suspense>
                    {children}
                    <Footprint />
            </div>
        </>
    );
}
