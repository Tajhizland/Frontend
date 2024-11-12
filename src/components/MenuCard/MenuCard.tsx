import React, {FC} from "react";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Link from "next/link";
import Image, {StaticImageData} from "next/image";
import {Route} from "next";

export interface MenuCardProps {
    className?: string;
    featuredImage?: StaticImageData | string;
    name?: string;
    desc?: string;
    url?: string;
    color?: string;
}

const MenuCard: FC<MenuCardProps> = ({
                                         featuredImage = "",
                                         name = "",
                                         color = "bg-red-50",
                                         url = ""
                                     }) => {
    return (
        <>
            {featuredImage && url &&
                <div
                    className={`relative w-full aspect-w-16 aspect-h-11 sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group bg-white`}
                >
                    <div>
                        <Link className="w-full h-full" href={(url ?? "/") as Route}>
                            <div className="w-full h-full">
                                <Image
                                    alt=""
                                    width={500}
                                    height={100}
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/menu/${featuredImage}`}
                                    className=" "
                                />
                            </div>
                        </Link>
                    </div>
                </div>}
                </>
            );
            };

            export default MenuCard;
