import localFont from 'next/font/local'
import {NextFont} from "next/dist/compiled/@next/font";
import "./globals.css";


const myFont: NextFont = localFont({src: '../fonts/fa/IRANSansWeb.woff2'})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir={"rtl"}>
    <link rel="manifest" href="/manifest.json"/>
    <meta name="theme-color" content="#fff"/>
    <link rel="apple-touch-icon" href="/icons/logo.png"/>
    <meta name="apple-mobile-web-app-status-bar" content="#fff"/>
      <body
        className={`${myFont.className}`}
      >
        {children}
      </body>
    </html>
  );
}
