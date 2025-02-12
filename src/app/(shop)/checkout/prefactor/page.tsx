//@ts-nocheck
"use client"
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import React, {useRef} from "react";
import {setCart, useCart, useUser} from "@/services/globalState/GlobalState";
import {useQuery} from "react-query";
import {getCart} from "@/services/api/shop/cart";
import PreFactorTable from "@/components/Factor/PreFactorTable";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Logo from "@/shared/Logo/Logo";
import Image from "next/image";
import logoLight from "@/images/tajhizland/logo.png";

export default function PreFactorPage() {
    const [cart] = useCart();
    const [user] = useUser();

    const {data, isSuccess} = useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart(),
        staleTime: 5000,
        enabled: !!user,
        onSuccess: (cartData) => {
            setCart(cartData);
        }
    });
    const contentRef = useRef(undefined);
    const handleDownloadPDF = async () => {
        try {
            const content = contentRef.current;

            // گرفتن عکس از صفحه با html2canvas
            const canvas = await html2canvas(content, {
                scale: 2, // افزایش کیفیت تصویر
                useCORS: true, // رفع مشکل منابع خارجی
                windowWidth: 1500,

            });

            const imgData = canvas.toDataURL("image/png");

            // محاسبه اندازه مناسب برای PDF
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("page.pdf"); // دانلود فایل PDF
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <div className={"bg-white "}>
            <div className={"container py-16 lg:pb-28 lg:pt-20"}>
                <div
                    ref={contentRef}
                    className={"pt-5"}
                >
                    <div
                        className={"border p-5 m-5  border-slate-400 rounded-lg bg-neutral-50"}>
                        <Image
                            className={`lg:h-10 w-auto max-w-40 mx-auto `}
                            src={logoLight}
                            alt="Logo"
                            priority
                        />
                        <p className={"text-sm text-neutral-800 my-1 text-center "}>
                            مرکز تخصصی تجهیزات کافه و رستوران
                        </p>
                        <h1 className={"font-bold  my-1 text-center "}>پیش فاکتور</h1>
                        <h2 className={" my-2 "}> مشخصات فروشنده </h2>
                        <div className={"border border-slate-400 grid grid-cols-3 text-sm gap-5 pt-3 pb-5 px-2 rounded-lg"}>
                            <div className={"flex gap-2"}>
                                <span>فروشنده:</span>
                                <span>تجهیزلند</span>
                            </div>
                            <div className={"flex gap-2"}>
                                <span>شماره تماس:</span>
                                <span>021-66477790-1</span>
                            </div>
                            <div className={"flex gap-2 col-span-2"}>
                                <span>نشانی:</span>
                                <span>تهران ، خیابان جمهوری ، بین خیابان دانشگاه و ابوریحان ، ضلع شمال خیابان جمهوری  ،پلاک 981 </span>
                            </div>
                        </div>
                        <div className={"my-10 overflow-x-auto border border-slate-400 rounded-lg"}>
                            <PreFactorTable cart={cart}/>
                        </div>
                    </div>
                </div>
                <ButtonPrimary
                    className={"mt-10"}
                    onClick={handleDownloadPDF}
                >
                    دانلود PDF
                </ButtonPrimary>
            </div>
        </div>
    );
}
