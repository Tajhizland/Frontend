"use client"
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import React, {useEffect, useRef} from "react";
import {setCart, useCart, useUser} from "@/services/globalState/GlobalState";
import {useQuery} from "@tanstack/react-query";
import {getCart} from "@/services/api/shop/cart";
import PreFactorTable from "@/components/Factor/PreFactorTable";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import logoLight from "@/images/lightLogo.png";
import {findActive} from "@/services/api/shop/address";

export default function PreFactorPage() {
    const [cart] = useCart();
    const [user] = useUser();

    const {data, isSuccess} = useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart(),
        staleTime: 5000,
        enabled: !!user,
    });
    useEffect(() => {
        if (isSuccess && data) setCart(data);
    }, [isSuccess, data]);

    const {data: address, isPending: addressPending, isError: addressError} = useQuery({
        queryKey: ['address'],
        queryFn: () => findActive(),
        staleTime: 5000,
        enabled: !!user,
    });
    const buyerName = [user?.name, user?.last_name].filter(Boolean).join(" ") || "—";
    const buyerAddress = [address?.province?.name, address?.city?.name, address?.address].filter(Boolean).join("، ") || "—";
    const contentRef = useRef<HTMLDivElement>(null);
    const handleDownloadPDF = async () => {
        try {
            const content = contentRef.current;
            if (!content || !user || addressPending || addressError) return;

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
                            className={`lg:h-auto w-auto max-w-40 mx-auto `}
                            src={logoLight}
                            alt="Logo"
                            priority
                        />
                        <p className={"text-sm text-neutral-800 my-1 text-center "}>
                            مرکز تخصصی تجهیزات کافه و رستوران
                        </p>
                        <h1 className={"font-bold  my-1 text-center "}>پیش فاکتور</h1>
                        <h2 className={" my-2 "}> مشخصات فروشنده </h2>
                        <div
                            className={"border border-slate-400 grid grid-cols-3 text-sm gap-5 pt-3 pb-5 px-2 rounded-lg"}>
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
                        <section aria-label="مشخصات مشتری">
                            <h2 className="my-2">مشخصات مشتری</h2>
                            <div className="border border-slate-400 grid grid-cols-1 md:grid-cols-3 text-sm gap-5 pt-3 pb-5 px-2 rounded-lg text-neutral-800">
                                <p><strong>نام و نام خانوادگی:</strong> {buyerName}</p>
                                <p><strong>کد ملی:</strong> <bdi>{user?.national_code || "—"}</bdi></p>
                                <p><strong>شماره تماس:</strong> <bdi>{address?.mobile || user?.username || "—"}</bdi></p>
                                <p><strong>تلفن ثابت:</strong> <bdi>{address?.tell || "—"}</bdi></p>
                                <p><strong>کد پستی:</strong> <bdi>{address?.zip_code || "—"}</bdi></p>
                                <p className="md:col-span-3"><strong>نشانی:</strong> {buyerAddress}</p>
                            </div>
                            {user && addressPending && <p role="status" className="my-2 text-sm">در حال دریافت مشخصات مشتری…</p>}
                            {addressError && <p role="alert" className="my-2 text-sm text-red-600">دریافت نشانی مشتری امکان‌پذیر نیست. لطفاً صفحه را دوباره بارگذاری کنید.</p>}
                        </section>
                        <div className={"my-10 overflow-x-auto border border-slate-400 rounded-lg"}>
                            <PreFactorTable cart={cart}/>
                        </div>
                        <div className={"flex flex-col gap-1 text-slate-800 text-sm"}>
                            <p>
                                این پیش فاکتور صرفاً جنبه اطلاع رسانی داشته و به عنوان سند مالی با تعهد فروش محسوب نمی
                                شود و هیچ ارزش قانونی ندارد.
                            </p>
                            <p>
                                این پیش فاکتور فقط تا 48 ساعت پس از صدور آن اعتبار دارد.

                            </p>
                            <p>
                                قیمت ها ممکن است به دلیل نوسانات بازار تغییر کنند، لذا پیش از تایید نهایی لطفاً از به
                                روز بودن قیمت ها اطمینان حاصل کنید.

                            </p>
                            <p>
                                در صورت اتمام موجودی کالا مبلغ پرداختی مسترد یا محصول جایگزین پیشنهاد خواهد شد.

                            </p>
                            <p>
                                هزینه و نحوه ارسال کالا پس از تایید و پرداخت نهایی به اطلاع خریدار خواهد رسید.

                            </p>

                        </div>
                    </div>
                </div>
                <ButtonPrimary
                    className={"mt-10"}
                    onClick={handleDownloadPDF}
                    disabled={!user || addressPending || addressError}
                >
                    دانلود PDF
                </ButtonPrimary>
            </div>
        </div>
    );
}
