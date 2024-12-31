//@ts-nocheck
"use client"
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import {useRef} from "react";
import {setCart, useCart, useUser} from "@/services/globalState/GlobalState";
import {useQuery} from "react-query";
import {getCart} from "@/services/api/shop/cart";
import PreFactorTable from "@/components/Factor/PreFactorTable";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

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
    const contentRef = useRef();
    const handleDownloadPDF = async () => {
        try {
            const content = contentRef.current;

            // گرفتن عکس از صفحه با html2canvas
            const canvas = await html2canvas(content, {
                scale: 2, // افزایش کیفیت تصویر
                useCORS: true, // رفع مشکل منابع خارجی
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
                <h1 className={"font-bold text-lg "}>پیش فاکتور</h1>
                <p className={"text-sm text-neutral-800 "}>
                    پیش فاکتور خرید اینترنتی از فروشگاه تجهیزلند .
                </p>
                <div className={"mt-10"}>
                    <PreFactorTable cart={cart}/>
                </div>
            </div>
            <ButtonPrimary
                className={"w-full mt-10"}
                onClick={handleDownloadPDF}
            >
                دانلود PDF
            </ButtonPrimary>
        </div>
        </div>
    );
}
