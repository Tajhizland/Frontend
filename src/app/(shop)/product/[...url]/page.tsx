 import React, { Suspense } from "react";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import NcImage from "@/shared/NcImage/NcImage";
import ReviewItem from "@/components/ReviewItem";
import detail21JPG from "@/images/products/detail3-1.webp";
import detail22JPG from "@/images/products/detail3-2.webp";
import detail23JPG from "@/images/products/detail3-3.webp";
import detail24JPG from "@/images/products/detail3-4.webp";
import { PRODUCTS } from "@/data/data";
import IconDiscount from "@/components/IconDiscount";
import NcInputNumber from "@/components/NcInputNumber";
import BagIcon from "@/components/BagIcon";
import toast from "react-hot-toast";
import { StarIcon } from "@heroicons/react/24/solid";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import NotifyAddTocart from "@/components/NotifyAddTocart";
import Image, { StaticImageData } from "next/image";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import AccordionInfo from "@/components/AccordionInfo";
import Policy from "../../product-detail/Policy";
import ModalViewAllReviews from "../../product-detail/ModalViewAllReviews";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Route } from "next";
import {findProductByUrl} from "@/services/api/shop/product";
import ProductSidebar from "@/app/(shop)/product/ProductSidebar";
import ProductImage from "../ProductImage";
import ProductComment from "../ProductComment";
import {addToFavorite, deleteFromFavorite} from "@/services/api/shop/favorite";
import SectionSliderProductCard2 from "@/components/SectionSliderProductCard2";

const LIST_IMAGES_GALLERY_DEMO: (string | StaticImageData)[] = [
  detail21JPG,
  detail22JPG,
  detail23JPG,
  detail24JPG,
  "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1778412/pexels-photo-1778412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/871494/pexels-photo-871494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2850487/pexels-photo-2850487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];
const PRICE = 108;
interface ProductPageProps {
    params: {
        url: [string];
    }
}

const ProductDetailPage2 = async ({params}:ProductPageProps) => {
  const { sizes, variants, status, allOfSizes, image } = PRODUCTS[0];
  //

    let productResponse = await findProductByUrl(decodeURIComponent(params.url.join("/")));
    let product=productResponse.product;
    let relatedProduct=productResponse.relatedProduct.data;

  //
  // const handleCloseModalImageGallery = () => {
  //   let params = new URLSearchParams(document.location.search);
  //   params.delete("modal");
  //   router.push(`${thisPathname}/?${params.toString()}` as Route);
  // };
  // const handleOpenModalImageGallery = () => {
  //   router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  // };

  //
  // const renderVariants = () => {
  //   if (!variants || !variants.length) {
  //     return null;
  //   }
  //
  //   return (
  //     <div>
  //       <label htmlFor="">
  //         <span className="text-sm font-medium">
  //           رنگ :
  //           <span className="mr-1 font-semibold">
  //             {variants[variantActive].name}
  //           </span>
  //         </span>
  //       </label>
  //       <div className="flex mt-3">
  //         {variants.map((variant, index) => (
  //           <div
  //             key={index}
  //             onClick={() => setVariantActive(index)}
  //             className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer ${
  //               variantActive === index
  //                 ? "border-primary-6000 dark:border-primary-500"
  //                 : "border-transparent"
  //             }`}
  //           >
  //             <div
  //               className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
  //               style={{
  //                 backgroundImage: `url(${
  //                   // @ts-ignore
  //                   typeof variant.thumbnail?.src === "string"
  //                     ? // @ts-ignore
  //                       variant.thumbnail?.src
  //                     : typeof variant.thumbnail === "string"
  //                     ? variant.thumbnail
  //                     : ""
  //                 })`,
  //               }}
  //             ></div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };
  //
  // const notifyAddTocart = () => {
  //   toast.custom(
  //     (t) => (
  //       <NotifyAddTocart
  //         productImage={image}
  //         qualitySelected={qualitySelected}
  //         show={t.visible}
  //         sizeSelected={sizeSelected}
  //         variantActive={variantActive}
  //       />
  //     ),
  //     { position: "top-right", id: "nc-product-notify", duration: 3000 }
  //   );
  // };


  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      "text-sm flex items-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="mr-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "50% Discount") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="mr-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="mr-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="mr-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  // const renderSectionSidebar = () => {
  //   return (
  //     <div className="listingSectionSidebar__wrap lg:shadow-lg">
  //       <div className="space-y-7 lg:space-y-8">
  //         {/* PRICE */}
  //         <div className="">
  //           {/* ---------- 1 HEADING ----------  */}
  //           <div className="flex items-center justify-between   gap-x-5">
  //             <div className="flex text-2xl font-semibold">
  //               ${PRICE.toFixed(2)}
  //             </div>
  //
  //             <a
  //               href="#reviews"
  //               className="flex items-center text-sm font-medium"
  //             >
  //               <div className="">
  //                 <StarIcon className="w-5 h-5 pb-[1px] text-orange-400" />
  //               </div>
  //               <span className="mr-1.5 flex">
  //                 <span>4.9 </span>
  //                 <span className="mx-1.5">·</span>
  //                 <span className="text-slate-700 dark:text-slate-400 underline">
  //                   142 reviews
  //                 </span>
  //               </span>
  //             </a>
  //           </div>
  //
  //           {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
  //           <div className="mt-6 space-y-7 lg:space-y-8">
  //             <div className="">{renderVariants()}</div>
  //             {/*<div className="">{renderSizeList()}</div>*/}
  //           </div>
  //         </div>
  //         {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
  //         <div className="flex  gap-x-3.5">
  //           <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
  //             <NcInputNumber
  //               defaultValue={qualitySelected}
  //               onChange={setQualitySelected}
  //             />
  //           </div>
  //           <ButtonPrimary
  //             className="flex-1 flex-shrink-0"
  //             onClick={notifyAddTocart}
  //           >
  //             <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
  //             <span className="mr-3">افزودن به سبد خرید</span>
  //           </ButtonPrimary>
  //         </div>
  //
  //         {/* SUM */}
  //         <div className="hidden sm:flex flex-col space-y-4 ">
  //           <div className="space-y-2.5">
  //             <div className="flex justify-between text-slate-600 dark:text-slate-300">
  //               <span className="flex">
  //                 <span>{`$${PRICE.toFixed(2)}  `}</span>
  //                 <span className="mx-2">x</span>
  //                 <span>{`${qualitySelected} `}</span>
  //               </span>
  //
  //               <span>{`$${(PRICE * qualitySelected).toFixed(2)}`}</span>
  //             </div>
  //             <div className="flex justify-between text-slate-600 dark:text-slate-300">
  //               <span>Tax estimate</span>
  //               <span>$0</span>
  //             </div>
  //           </div>
  //           <div className="border-b border-slate-200 dark:border-slate-700"></div>
  //           <div className="flex justify-between font-semibold">
  //             <span>Total</span>
  //             <span>{`$${(PRICE * qualitySelected).toFixed(2)}`}</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

    async function likeHandle(like: boolean) {
        if (like) {
            let response =  await addToFavorite({productId: product?.id as number})
            toast.success(response?.message as string)
        } else {
            let response =  await deleteFromFavorite({productId: product?.id as number})
            toast.success(response?.message as string)

        }
    }


    const renderOption = () => {
        const options = product.productOptions.data
            .map((item) => `<li>${item.option_title}: ${item.value}</li>`)
            .join("");

        return `<ul>${options}</ul>`;
    };
  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
              {product.name}
          </h2>
          <div className="flex items-center mt-4 sm:mt-5">
            <a
              href="#reviews"
              className="hidden sm:flex items-center text-sm font-medium "
            >
              <div className="">
                <StarIcon className="w-5 h-5 pb-[1px] text-slate-800 dark:text-slate-200" />
              </div>
              <span className="mr-1.5">
                <span>{product.rating}</span>
                <span className="mx-1.5">·</span>
                <span className="text-slate-700 dark:text-slate-400 underline">
                  {product.comments.data.length} نظر
                </span>
              </span>
            </a>
            <span className="hidden sm:block mx-2.5">·</span>
            {renderStatus()}

            <div className="mr-auto">
              <LikeSaveBtns like={product.favorite} productId={product.id} />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="block lg:hidden">
        <ProductSidebar product={product}  />
          {
            // renderSectionSidebar()
        }</div>

        {/*  */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/*  */}
          <AccordionInfo
              data={[
                  {
                      name: "توضیحات",
                      content: product.description
                  },
                  {
                      name: "بررسی اجمالی",
                      content: product.study

                  },
                  {
                      name: "مشخصات محصول",
                      content: renderOption()

                  },

              ]}/>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap !border-b-0 !pb-0">
        <h2 className="text-2xl font-semibold">بررسی تخصصی</h2>
        {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
          <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl">
              <div dangerouslySetInnerHTML={{__html: product.review}}/>

          </div>
          {/* ---------- 6 ----------  */}
          <Policy/>
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div id="reviews" className="scroll-mt-[150px]">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5" />
          <span className="mr-1.5"> {product.comments.data.length} نظر </span>
        </h2>

        {/* comment */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            <ReviewItem />
            <ReviewItem
              data={{
                comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes.
                  If you’re unsure which hoodie to pick.`,
                date: "December 22, 2021",
                name: "Stiven Hokinhs",
                starPoint: 2,
              }}
            />
            <ReviewItem
              data={{
                comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie.
                Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
                date: "August 15, 2022",
                name: "Gropishta keo",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed.
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
                date: "December 12, 2022",
                name: "Dahon Stiven",
                starPoint: 5,
              }}
            />
          </div>

          <ButtonSecondary
            className="mt-10 border border-slate-300 dark:border-slate-700 "
          >
            Show me all 142 reviews
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <div className={`ListingDetailPage nc-ProductDetailPage2`}>
         <ProductImage productImages={product.images.data} />


      {/* MAIn */}
      <main className="container relative z-10 mt-9 sm:mt-11 flex ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-10 lg:pl-14 lg:space-y-14">
          {renderSection1()}
          {renderSection2()}
        </div>

        {/* SIDEBAR */}
        <div className="flex-grow">
          <div className="hidden lg:block sticky top-28">
            {/*{renderSectionSidebar()}*/}
            <ProductSidebar product={product}  />
          </div>
        </div>
      </main>

      {/* OTHER SECTION */}
      <div className="container pb-24 lg:pb-28 pt-14 space-y-14">
        <hr className="border-slate-200 dark:border-slate-700" />
{/*
        {renderReviews()} */}
        <ProductComment comments={product.comments.data} />

        <hr className="border-slate-200 dark:border-slate-700" />

        <SectionSliderProductCard2
          heading="محصولات مرتبط"
          subHeading=""
          headingFontClassName="text-2xl font-semibold"
          data={relatedProduct}
          headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
        />
      </div>

      {/* MODAL VIEW ALL REVIEW */}


    </div>
  );
};

export default ProductDetailPage2;
