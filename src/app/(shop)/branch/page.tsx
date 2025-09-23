"use client"
import React from "react";
import Maps from "@/components/Maps/Maps";
import {MdEmail} from "react-icons/md";
import {FaPhone} from "react-icons/fa";
import poster from "@/images/poster3dSite.png";
import {FaLocationCrosshairs, FaLocationDot} from "react-icons/fa6";
import Image from "next/image";
import posterTajhizland from "@/images/posterTajhizland.png";
import {IoLocationSharp} from "react-icons/io5";
import VideoPlayer from "@/shared/VideoPlayer/VideoPlayer";

export default function Page() {
    const latitude = 35.69589116711923;
    const longitude = 51.397654536591794;
    const info = [
        {
            icon: <FaLocationCrosshairs/>,
            title: "آدرس",
            desc: "تهران ، خیابان جمهوری ، بین خیابان دانشگاه و ابوریحان ، ضلع شمال خیابان جمهوری(لاین خط ویژه) ،پلاک 981 ",
        },
        {
            icon: <MdEmail/>,
            title: "ایمیل",
            desc: "support@tajhizland.com",
        },
        {
            icon: <FaPhone/>,
            title: "تلفن",
            desc: <a
                href="tel:02166477790"
            >
                021-66477790-1
            </a>,
        },
        {
            icon: <FaLocationDot/>,
            title: " لوکیشن",
            desc: <Maps/>,
        },
    ];

    const handleOpenAndroidMaps = () => {
        const url = `intent://maps.google.com/maps?daddr=${latitude},${longitude}#Intent;scheme=https;package=com.google.android.apps.maps;end`;
        window.open(url, '_blank');
    };

    return (
        <div className={`nc-PageContact overflow-hidden dark:bg-slate-900 dark:text-white mb-10`}>
            <div className="">
                <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                    فروشگاه حضوری تجهیزلند
                </h2>
                <div className="container max-w-7xl mx-auto">
                    <div className={"flex flex-col-reverse md:flex-row  gap-5"}>
                        <div className={"flex flex-col gap-5 items-start flex-1"}>
                            <div className={"w-full rounded-2xl overflow-hidden"}>
                                <VideoPlayer src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/1740900752_14178.mp4`}
                                             poster={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/1740900755_20999.jpg`}/>
                            </div>
                            <div className={"flex items-start gap-1"}>
                                <IoLocationSharp className={"w-4 h-4"}/>
                                <strong>
                                    آدرس فروشگاه حضوری :
                                </strong>
                            </div>
                            <p className={"text-sm"}>
                                تهران ، خیابان جمهوری ، بین خیابان دانشگاه و ابوریحان ، ضلع شمال خیابان جمهوری(لاین خط
                                ویژه)
                                ،پلاک 981
                            </p>
                            <div className={"flex justify-between items-center w-full"}>
                                <strong className={"text-[#fcb415] cursor-pointer"} onClick={handleOpenAndroidMaps}>
                                    مسیریابی آنلاین
                                </strong>
                                <a href={"tel:02166477790"} className={"font-bold text-lg"}>
                                    ۰۲۱-۶۶۴۷۷۷۹۰
                                </a>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-5 flex-1 md:col-span-1 items-start"}>
                            <Image src={poster} alt={"poster"}/>
                        </div>

                    </div>
                    <div className={"mt-10 w-full h-64"}>
                        <Maps/>
                    </div>
                </div>
            </div>


        </div>
    );
};
