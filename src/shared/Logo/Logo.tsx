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
                                       className = "flex-shrink-0",
                                       imageClassName = "flex-shrink-0",
                                   }) => {
    return (
        <Link
            href="/"
            className={`ttnc-logo inline-block text-slate-600 ${className}`}
        >

            {logoLight && (
                <Image
                    className={`hidden lg:h-10 w-auto sm:block dark:hidden ${imageClassName} `}
                    src={logoLight}
                    alt="Logo"
                    priority
                />
            )}
            {logoLighSmall && (
                <Image
                    className={`block lg:h-10 w-auto sm:hidden dark:hidden ${imageClassName} `}
                    src={logoLighSmall}
                    alt="Logo"
                    priority
                />
            )}
            {logoDark && (
                <Image
                    className={`hidden  lg:h-10 w-auto sm:dark:block ${imageClassName}`}
                    src={logoDark}
                    alt="Logo-Light"
                    priority
                />
            )}
            {logoDarkSmall && (
                <Image
                    className={`hidden dark:block  lg:h-10 w-auto sm:dark:hidden  ${imageClassName}`}
                    src={logoDarkSmall}
                    alt="Logo-Light"
                    priority
                />
            )}
        </Link>
    );
};

export default Logo;
