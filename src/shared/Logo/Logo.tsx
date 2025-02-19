import React from "react";
import darlLogo from "@/images/darlLogo.png";
import lightLogo from "@/images/lightLogo.png";
import lightSmallLogo from "@/images/lightSmallLogo.png";
import darkSmallLogo from "@/images/darkSmallLogo.png";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
    className?: string;
    imageClassName?: string;
}

const Logo: React.FC<LogoProps> = ({

                                       className = "flex-shrink-0 ",
                                       imageClassName = "flex-shrink-0",
                                   }) => {
    return (
        <div className={"w-full max-w-32 md:max-w-48  flex items-center"}>
        <Link
            href="/"
            className={`ttnc-logo inline-block text-slate-600  aspect-h-1 aspect-w-4 sm:aspect-w-5 w-full h-0 ${className}`}
        >

            {lightLogo && (
                <Image
                    className={`hidden  h-full w-full sm:block dark:hidden ${imageClassName} `}
                    src={lightLogo}
                    alt="Logo"
                    priority
                />
            )}
            {lightSmallLogo && (
                <Image
                    className={`block  h-full w-full sm:hidden dark:hidden ${imageClassName} `}
                    src={lightSmallLogo}
                    alt="Logo"
                    priority
                />
            )}
            {darlLogo && (
                <Image
                    className={`hidden  h-full w-full sm:dark:block ${imageClassName}`}
                    src={darlLogo}
                    alt="Logo-Light"
                    priority
                />
            )}
            {darkSmallLogo && (
                <Image
                    className={`hidden dark:block h-full w-full sm:dark:hidden  ${imageClassName}`}
                    src={darkSmallLogo}
                    alt="Logo-Light"
                    priority
                />
            )}
        </Link>
        </div>
    );
};

export default Logo;
