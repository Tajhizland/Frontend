"use client"
import "../globals.css";
import "@/styles/index.scss";
import {Suspense} from "react";
import AutoLoading from "@/app/(shop)/AutoLoading";
import CommonClient from "@/app/(shop)/CommonClient";


export default function AdminLayout({
                                        children,
                                        params,
                                    }: {
    children: React.ReactNode;
    params: any;
}) {

    return (
        <>
            <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 h-full">
                <div className={"h-full flex justify-center items-center"}>
                        <Suspense>
                            <AutoLoading/>
                        </Suspense>
                        {children}
                </div>
            </div>
            <CommonClient/>
        </>
    );
}
