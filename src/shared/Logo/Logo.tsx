import React from "react";
 import logoImg from "@/images/tajhizland/logoDark.png";
import logoLightImg from "@/images/tajhizland/logo.png";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
  imageClassName?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "flex-shrink-0",
  imageClassName="flex-shrink-0",
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {logoLightImg ? (
        <Image
          className={`block  lg:h-10 w-auto ${
            imgLight ? "dark:hidden" : ""
          }  ${imageClassName}`}
          src={logoLightImg}
          alt="Logo"
           priority
        />
      ) : (
        "Logo Here"
      )}
      {logoImg && (
        <Image
          className={`hidden  lg:h-10 w-auto dark:block ${imageClassName}`}
          src={logoImg}
          alt="Logo-Light"
           priority
        />
      )}
    </Link>
  );
};

export default Logo;
