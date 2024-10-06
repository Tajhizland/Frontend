"use client"

import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import { ProductImageResponse } from "@/services/types/productImage";
import NcImage from "@/shared/NcImage/NcImage";
import { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";

export default function ProductImage({ productImages }: { productImages: ProductImageResponse[] }) {
    const router = useRouter();
    const thisPathname = usePathname();
    const handleCloseModalImageGallery = () => {
        let params = new URLSearchParams(document.location.search);
        params.delete("modal");
        router.push(`${thisPathname}/?${params.toString()}` as Route);
    };
    const handleOpenModalImageGallery = () => {
        router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
    };
    return (<>

<>
        <header className="container mt-8 sm:mt-10">
          <div className="relative ">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6">
              <div
                className="md:h-full col-span-2 md:col-span-1 row-span-2 relative rounded-md sm:rounded-xl cursor-pointer"
               onClick={handleOpenModalImageGallery}
              >
                <NcImage
                  alt="firt"
                  containerClassName="aspect-w-3 aspect-h-4 relative md:aspect-none md:absolute md:inset-0"
                  className="object-cover rounded-md sm:rounded-xl"
                   src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${productImages[0]?.url}`}

                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity rounded-md sm:rounded-xl"></div>
              </div>

              {/* /!*  *!/ */}
              <div
                className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden z-0 cursor-pointer"
                onClick={handleOpenModalImageGallery}
              >
                <NcImage
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  containerClassName="absolute inset-0"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${productImages[1]?.url}`}
                />
                <div className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity"></div>
              </div>

              {/* /!*  *!/ */}
              {[productImages[2]?.url??"", productImages[3]?.url??""].map(
                (item, index) => (
                  <div
                    key={index}
                    className={`relative rounded-md sm:rounded-xl overflow-hidden z-0 ${
                      index >= 2 ? "block" : ""
                    }`}
                  >
                    <NcImage
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      containerClassName="aspect-w-6 aspect-h-5 lg:aspect-h-4"
                      className="object-cover w-full h-full rounded-md sm:rounded-xl "
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item}`}
                    />

                    {/* /!* OVERLAY *!/ */}
                    <div
                      className="absolute inset-0 bg-slate-900/20 opacity-0 hover:opacity-60 transition-opacity cursor-pointer"
                      onClick={handleOpenModalImageGallery}
                    />
                  </div>
                )
              )}
            </div>
            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-white text-slate-500 cursor-pointer hover:bg-slate-200 z-10"
              onClick={handleOpenModalImageGallery}
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
          </div>
        </header>
      </>
        <Suspense>
            <ListingImageGallery
                onClose={handleCloseModalImageGallery}
                images={productImages}
            />
        </Suspense>
    </>)
}
