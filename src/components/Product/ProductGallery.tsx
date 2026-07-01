"use client";

import "@/components/listing-image-gallery/styles/index.css";
import React, {Fragment, useMemo, useState} from "react";
import Image from "next/image";
import {Dialog, DialogPanel, Transition, TransitionChild} from "@headlessui/react";
import {motion} from "framer-motion";
// @ts-ignore - react-use-keypress بدون تایپ است
import useKeypress from "react-use-keypress";
import {ArrowRightIcon} from "@heroicons/react/24/solid";
import NcImage from "@/shared/NcImage/NcImage";
import SharedModal from "@/components/listing-image-gallery/components/SharedModal";
import {ProductImageResponse} from "@/services/types/productImage";

const BASE = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/`;

export default function ProductGallery({productImages}: { productImages: ProductImageResponse[] }) {
    // نمایش لیست کامل تصاویر (اسکرول)
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    // نمایش تک تصویر (لایت‌باکس) — index یا null، همه‌چیز با state محلی و بدون url
    const [photoIndex, setPhotoIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState(0);

    // برای SharedModal، id باید برابر ایندکس آرایه باشد تا کاملاً بر اساس ایندکس کار کند
    const galleryImages = useMemo(
        () => productImages.map((img, i) => ({...img, id: i})),
        [productImages]
    );

    const openGallery = () => setIsGalleryOpen(true);
    const closeGallery = () => setIsGalleryOpen(false);

    const changePhotoId = (newVal: number) => {
        setDirection(newVal > (photoIndex ?? 0) ? 1 : -1);
        setPhotoIndex(newVal);
    };

    useKeypress("ArrowRight", () => {
        if (photoIndex !== null && photoIndex + 1 < productImages.length) {
            changePhotoId(photoIndex + 1);
        }
    });
    useKeypress("ArrowLeft", () => {
        if (photoIndex !== null && photoIndex > 0) {
            changePhotoId(photoIndex - 1);
        }
    });

    return (
        <>
            {/* ---------- پیش‌نمایش گرید (همان UI قبلی) ---------- */}
            <header className="container mt-2 sm:mt-10">
                <div className="relative ">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6">
                        <div
                            className="md:h-full col-span-2 md:col-span-1 row-span-2 relative rounded-md sm:rounded-xl cursor-pointer border"
                            onClick={openGallery}
                        >
                            <NcImage
                                alt="firt"
                                containerClassName="aspect-w-3 aspect-h-4 relative md:aspect-none md:absolute md:inset-0"
                                className="object-cover rounded-md sm:rounded-xl"
                                src={`${BASE}${productImages[0]?.url}`}
                                fill
                                sizes="(max-width: 640px) 100vw, 50vw"
                                priority
                            />
                            <div
                                className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity rounded-md sm:rounded-xl"></div>
                        </div>

                        <div
                            className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden z-0 cursor-pointer border"
                            onClick={openGallery}
                        >
                            <NcImage
                                alt=""
                                fill
                                sizes="(max-width: 640px) 100vw, 50vw"
                                containerClassName="absolute inset-0"
                                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                                src={`${BASE}${productImages[1]?.url ?? productImages[0]?.url}`}
                            />
                            <div
                                className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity"></div>
                        </div>

                        {[productImages[2]?.url ?? productImages[0]?.url, productImages[3]?.url ?? productImages[1]?.url ?? productImages[0]?.url].map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className={`relative rounded-md sm:rounded-xl overflow-hidden z-0 border cursor-pointer ${
                                        index >= 2 ? "block" : ""
                                    }`}
                                    onClick={openGallery}
                                >
                                    <NcImage
                                        alt=""
                                        fill
                                        sizes="(max-width: 640px) 100vw, 33vw"
                                        containerClassName="aspect-w-6 aspect-h-5 lg:aspect-h-4"
                                        className="object-cover w-full h-full rounded-md sm:rounded-xl "
                                        src={`${BASE}${item}`}
                                    />
                                    <div
                                        className="absolute inset-0 bg-slate-900/20 opacity-0 hover:opacity-60 transition-opacity cursor-pointer"/>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </header>

            <div className=" container">
                <div
                    className={` w-full mt-5 ${productImages.length > 5 ? " justify-center items-center flex gap-2  md:gap-4  border p-4 rounded" : ""}`}>
                    <div
                        className=" w-fit border mx-auto sm:mx-0 flex items-center justify-center px-4 py-2 rounded-xl bg-white text-slate-500 cursor-pointer hover:bg-slate-200 z-10 shrink-0"
                        onClick={openGallery}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                        </svg>
                        <span className="mr-2 text-neutral-800 text-sm font-medium">
                            نمایش تمام تصاویر
                        </span>
                    </div>

                    {productImages.length > 5 && <div className={"items-center justify-center hidden md:flex gap-1"}>
                        {productImages.slice(0, 5)?.map((item, index) => (
                            <div onClick={openGallery} className={"w-24 "} key={index}>
                                <NcImage
                                    alt=""
                                    fill
                                    sizes="(max-width: 640px) 100vw, 33vw"
                                    containerClassName="aspect-w-6 aspect-h-5 lg:aspect-h-4"
                                    className="object-cover w-full h-full rounded-md sm:rounded-xl cursor-pointer"
                                    src={`${BASE}${item.url}`}
                                />
                            </div>
                        ))}
                        <div
                            className=" w-fit border mx-auto sm:mx-0 flex items-center justify-center px-4 py-2 rounded-xl bg-white text-slate-800 cursor-pointer hover:bg-slate-200 z-10"
                            onClick={openGallery}
                        >
                            {productImages.length}+
                        </div>
                    </div>}

                    {productImages.length > 5 && <div className={"items-center justify-center  md:hidden flex"}>
                        {productImages.slice(0, 2)?.map((item, index) => (
                            <div onClick={openGallery} className={"w-14"} key={index}>
                                <NcImage
                                    alt=""
                                    fill
                                    sizes="(max-width: 640px) 100vw, 33vw"
                                    containerClassName="aspect-w-6 aspect-h-5 lg:aspect-h-4"
                                    className="object-cover w-full h-full rounded-md sm:rounded-xl cursor-pointer"
                                    src={`${BASE}${item.url}`}
                                />
                            </div>
                        ))}
                        <div
                            className=" w-fit border mx-auto sm:mx-0 flex items-center justify-center px-1 py-1 rounded-xl bg-white text-slate-800 cursor-pointer  text-sm font-bold z-10"
                            onClick={openGallery}
                        >
                            {productImages.length}+
                        </div>
                    </div>}
                </div>
            </div>

            {/* ---------- مودال لیست کامل تصاویر (state-driven) ---------- */}
            <Transition appear show={isGalleryOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[120]" onClose={closeGallery}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-white"/>
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div
                            className="sticky z-10 top-0 p-4 xl:px-10 flex items-center justify-between bg-white">
                            <button
                                className="focus:outline-none focus:ring-0 w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100"
                                onClick={closeGallery}
                            >
                                <ArrowRightIcon className="w-8 h-8"/>
                            </button>
                        </div>

                        <div className="flex min-h-full items-center justify-center sm:p-4 pt-0 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-5"
                                enterTo="opacity-100 translate-y-0"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-5"
                            >
                                <DialogPanel
                                    className="w-full max-w-screen-lg mx-auto transform p-4 pt-0 text-left transition-all">
                                    <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
                                        {productImages.map(({url}, id) => (
                                            <div
                                                key={id}
                                                onClick={() => changePhotoId(id)}
                                                className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight focus:outline-none"
                                            >
                                                <Image
                                                    alt="product gallery"
                                                    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 focus:outline-none"
                                                    style={{transform: "translate3d(0, 0, 0)"}}
                                                    src={`${BASE}${url}`}
                                                    width={720}
                                                    height={480}
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 350px"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* ---------- لایت‌باکس تک‌تصویر (state-driven) ---------- */}
            {photoIndex !== null && (
                <Dialog
                    static
                    open={true}
                    onClose={() => setPhotoIndex(null)}
                    className="fixed inset-0 z-[130] flex items-center justify-center"
                >
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-30 bg-white"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        onClick={() => setPhotoIndex(null)}
                    />
                    <SharedModal
                        index={photoIndex}
                        direction={direction}
                        images={galleryImages}
                        changePhotoId={changePhotoId}
                        closeModal={() => setPhotoIndex(null)}
                        navigation={true}
                    />
                </Dialog>
            )}
        </>
    );
}
