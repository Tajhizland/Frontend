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
        <div className={" container py-16 lg:pb-28 lg:pt-20  "}>
            <div
                ref={contentRef}
            >
                <h1 className={"font-bold text-2xl my-1 text-center "}>پیش فاکتور</h1>
                <p className={"text-xl text-neutral-800 my-1 text-center "}>
                    پیش فاکتور خرید اینترنتی از فروشگاه تجهیزلند .
                </p>
                <div className={"my-10 overflow-x-auto"}>
                    <PreFactorTable cart={cart}/>
                </div>
                <Image
                    className={`lg:h-10 w-auto max-w-40 mx-auto `}
                    src={logoLight}
                    alt="Logo"
                    priority
                />

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
