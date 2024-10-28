"use client"
import {Poppins} from "next/font/google";
import "../globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import localFont from 'next/font/local'
import {Suspense, useState} from "react";
import {NextFont} from "next/dist/compiled/@next/font";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import CommonClient from "@/app/(shop)/CommonClient";
import {QueryClient, QueryClientProvider} from "react-query";
import AutoLoading from "@/app/admin/AutoLoading";

const myFont: NextFont = localFont({src: '../../fonts/fa/IRANSansWeb.woff2'})
const myFont2: NextFont = localFont({src: '../../fonts/fa/IRANSansWeb(FaNum).woff2'})

export default function AdminLayout({
                                        children,
                                        params,
                                    }: {
    children: React.ReactNode;
    params: any;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const queryClient = new QueryClient();
    return (
        <>
            <html dir={"rtl"}>
            <body className={[myFont.className, myFont2.className].join(" ")}>
            <QueryClientProvider client={queryClient}>

            <Navbar sidebarControl={() => {
                setSidebarOpen(!sidebarOpen)
            }}/>
            <Sidebar isOpen={sidebarOpen}/>
            <div className={`py-2 bg-slate-100 min-h-screen mt-14 transition-all  ${sidebarOpen ? "md:mr-52 " : " "}`}>
                <Suspense>
                    <AutoLoading/>
                </Suspense>
                    {children}
            </div>
            </QueryClientProvider>

            <CommonClient/>

            </body>
            </html>
        </>
    );
}
