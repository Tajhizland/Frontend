"use client"
import "../globals.css";
import "@/styles/index.scss";
import {QueryClient, QueryClientProvider} from "react-query";
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


    const queryClient = new QueryClient();

    return (
        <>
            <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 h-full">
                <div className={"h-full flex justify-center items-center"}>
                    <QueryClientProvider client={queryClient}>
                        <Suspense>
                            <AutoLoading/>
                        </Suspense>
                        {children}
                    </QueryClientProvider>
                </div>
            </div>
            <CommonClient/>
        </>
    );
}
