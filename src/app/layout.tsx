"use client"
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import localFont from 'next/font/local'
import {NextFont} from "next/dist/compiled/@next/font";

const myFont: NextFont = localFont({src: '../fonts/fa/IRANSansWeb.woff2'})
const myFont2: NextFont = localFont({src: '../fonts/fa/IRANSansWeb(FaNum).woff2'})

export default function AdminLayout({
                                        children,
                                        params,
                                    }: {
    children: React.ReactNode;
    params: any;
}) {
    return (
        <>
            <html dir={"rtl"}>
            <body className={[myFont.className, myFont2.className].join(" ")}>
                  {children}
            </body>
            </html>
        </>
    );
}
