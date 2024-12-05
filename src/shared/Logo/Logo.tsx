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
  imageClassName=""
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
          className={`block h-8 sm:h-10 w-auto ${
            imgLight ? "dark:hidden" : ""
          }  ${imageClassName}`}
          src={logoLightImg}
          alt="Logo"
          sizes="200px"
          priority
        />
      ) : (
        "Logo Here"
      )}
      {logoImg && (
        <Image
          className={`hidden h-8 sm:h-10 w-auto dark:block ${imageClassName}`}
          src={logoImg}
          alt="Logo-Light"
          sizes="200px"
          priority
        />
      )}
    </Link>
  );
};

export default Logo;
