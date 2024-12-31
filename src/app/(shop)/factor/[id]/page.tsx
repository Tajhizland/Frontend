//@ts-nocheck
"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {findById} from "@/services/api/admin/order";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import NcImage from "@/shared/NcImage/NcImage";
import Prices from "@/components/Prices";
import {OrderStatus} from "@/app/admin/order/orderStatus";
import {useRef} from "react";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import PreFactorTable from "@/components/Factor/PreFactorTable";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import FactorTable from "@/components/Factor/FactorTable";

export default function Page() {
    const {id} = useParams();

    const {data: data} = useQuery({
        queryKey: [`order-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const contentRef = useRef();
    const handleDownloadPDF = async () => {
        try {
            const content = contentRef.current;

            // گرفتن عکس از صفحه با html2canvas
            const canvas = await html2canvas(content, {
                scale: 2, // افزایش کیفیت تصویر
                useCORS: true, // رفع مشکل منابع خارجی
                windowWidth: 1200, // عرض ثابت برای رندر دسکتاپ
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
        <div className={"bg-white  "}>
            <div className={" container py-16 lg:pb-28 lg:pt-20  "}>
                <div
                    className={"p-5"}
                    ref={contentRef}
                >
                    <h1 className={"font-bold text-lg "}> فاکتور</h1>
                    <p className={"text-sm text-neutral-800  "}>
                          فاکتور خرید اینترنتی از فروشگاه تجهیزلند .
                    </p>
                    <div className={"mt-10"}>
                        {data && <FactorTable order={data}/>}
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
