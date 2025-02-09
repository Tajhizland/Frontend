//@ts-nocheck
"use client"
import {findById} from "@/services/api/admin/order";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import React, {useRef} from "react";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import FactorTable from "@/components/Factor/FactorTable";
import Logo from "@/shared/Logo/Logo";
import Image from "next/image";
import logoLight from "@/images/tajhizland/logo.png";

export default function Page() {
    const {id} = useParams();

    const {data: data} = useQuery({
        queryKey: [`order-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const contentRef = useRef(undefined);
    const handleDownloadPDF = async () => {
        try {
            const content = contentRef.current;

             const canvas = await html2canvas(content, {
                scale: 1,
                useCORS: true,
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
        <div className={"bg-white  "}>
            <div className={" container py-16 lg:pb-28 lg:pt-20  "}>
                <div
                    className={"p-5"}
                    ref={contentRef}
                >

                    <h1 className={"font-bold text-2xl text-center my-1"}> فاکتور</h1>
                    <p className={"text-lg text-neutral-800  text-center my-1"}>
                          فاکتور خرید اینترنتی از فروشگاه تجهیزلند .
                    </p>
                    <div className={"my-10"}>
                        {data && <FactorTable order={data}/>}
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
