"use client"
import Image from "next/image";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {AiOutlineCloseCircle} from "react-icons/ai";
import React, {useEffect, useState} from "react";
import {FaChevronCircleLeft, FaChevronCircleRight} from "react-icons/fa";
import {SampleImageResponse} from "@/services/types/sampleImage";
import NcImage from "@/shared/NcImage/NcImage";

interface galleryProps {
    images: SampleImageResponse[];
    open: boolean;
    close: () => void;
    index: number;
}

export default function Gallery({images, open, close, index}: galleryProps) {
    const [imageIndex, setImageIndex] = useState(index);

    useEffect(() => {
        setImageIndex(index);
    }, [index])

    const nextClickHandle = () => {
        if (imageIndex < images.length - 1) {
            setImageIndex(imageIndex + 1);
            return;
        }
        setImageIndex(0);
    }
    const prevClickHandle = () => {
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1);
            return;
        }
        setImageIndex(images.length - 1);
    }

    const renderNextPrevButton = () => {
        return <div className={"flex justify-between items-center absolute top-1/2 w-full px-2 sm:px-5 z-50"}>
            <div>
                <FaChevronCircleRight onClick={nextClickHandle}
                                      className={'text-white w-8 h-8 hover:text-[#fcb415] cursor-pointer'}/>
            </div>
            <div>
                <FaChevronCircleLeft onClick={prevClickHandle}
                                     className={'text-white w-8 h-8 hover:text-[#fcb415] cursor-pointer'}/>
            </div>
        </div>
    }


    if (!open)
        return <></>

    return (<>
        <Dialog open={open} onClose={close} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-slate-900  transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-full overflow-y-auto">
                <div className="flex min-h-full items-end justify-center  text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden  text-right   transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in  w-full data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 py-10 h-[100vh] flex flex-col gap-5 items-center justify-center"
                    >
                        {renderNextPrevButton()}
                        <div className={"absolute top-5 right-5 cursor-pointer"} onClick={close}>
                            <AiOutlineCloseCircle className={"text-white w-8 h-8"}/>
                        </div>
                        <div className={"flex container justify-center"}>
                            <div
                                className={"h-full w-full  rounded-xl overflow-hidden cursor-zoom-in group relative"}>
                                <NcImage
                                    containerClassName="flex aspect-w-2 aspect-h-1 w-full h-0"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/sample/${images[imageIndex].image}`}
                                    className="object-cover w-full h-full drop-shadow-xl"
                                    fill
                                    alt="product"
                                />
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>


    </>)
}
