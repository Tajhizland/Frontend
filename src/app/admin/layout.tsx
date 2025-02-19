"use client"
import "../globals.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import {Suspense, useState} from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import CommonClient from "@/app/(shop)/CommonClient";
import {QueryClient, QueryClientProvider} from "react-query";
import AutoLoading from "@/app/admin/AutoLoading";


export default function AdminLayout({
                                        children,
                                        params,
                                    }: {
    children: React.ReactNode;
    params: any;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const queryClient = new QueryClient(
        {
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                },
            },
        }
    );
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Navbar sidebarControl={() => {
                    setSidebarOpen(!sidebarOpen)
                }}/>
                <Sidebar isOpen={sidebarOpen}/>
                <div className={`pb-2 pt-4 bg-slate-100 min-h-screen mt-14 transition-all  ${sidebarOpen ? "md:mr-52 " : " "}`}>
                    <Suspense>
                        <AutoLoading/>
                    </Suspense>
                    {children}
                </div>
            </QueryClientProvider>
            <CommonClient/>
        </div>
    );
}
