import React from "react";
import logoDark from "@/images/tajhizland/logoDark.png";
import logoLight from "@/images/tajhizland/logo.png";
import logoLighSmall from "@/images/tajhizland/logo3.png";
import logoDarkSmall from "@/images/tajhizland/logo4.png";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
    img?: string;
    imgLight?: string;
    className?: string;
    imageClassName?: string;
}

const Logo: React.FC<LogoProps> = ({
                                       img = logoDark,
                                       imgLight = logoLight,
                                       className = "flex-shrink-0 ",
                                       imageClassName = "flex-shrink-0",
                                   }) => {
    return (
        <div className={"w-full max-w-32 md:max-w-48  flex items-center"}>
        <Link
            href="/"
            className={`ttnc-logo inline-block text-slate-600  aspect-h-1 aspect-w-4 sm:aspect-w-5 w-full h-0 ${className}`}
        >

            {logoLight && (
                <Image
                    className={`hidden  h-full w-full sm:block dark:hidden ${imageClassName} `}
                    src={logoLight}
                    alt="Logo"
                    priority
                />
            )}
            {logoLighSmall && (
                <Image
                    className={`block  h-full w-full sm:hidden dark:hidden ${imageClassName} `}
                    src={logoLighSmall}
                    alt="Logo"
                    priority
                />
            )}
            {logoDark && (
                <Image
                    className={`hidden  h-full w-full sm:dark:block ${imageClassName}`}
                    src={logoDark}
                    alt="Logo-Light"
                    priority
                />
            )}
            {logoDarkSmall && (
                <Image
                    className={`hidden dark:block h-full w-full sm:dark:hidden  ${imageClassName}`}
                    src={logoDarkSmall}
                    alt="Logo-Light"
                    priority
                />
            )}
        </Link>
        </div>
    );
};

export default Logo;
