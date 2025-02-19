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
import Image from "next/image";
import logoLight from "@/images/lightLogo.png";

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
                    <div
                        className={"border p-5 m-5  border-slate-400 rounded-lg"}>
                        <Image
                            className={`lg:h-auto w-auto max-w-40 mx-auto `}
                            src={logoLight}
                            alt="Logo"
                            priority
                        />
                        <p className={"text-sm text-neutral-800 my-1 text-center "}>
                            مرکز تخصصی تجهیزات کافه و رستوران
                        </p>
                        <h1 className={"font-bold  my-1 text-center "}>فاکتور</h1>
                        <h2 className={" my-2 "}> مشخصات فروشنده </h2>
                        <div className={"border border-slate-400 p-2 grid grid-cols-3 text-sm gap-5"}>
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
                            {data && <FactorTable order={data}/>}
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
