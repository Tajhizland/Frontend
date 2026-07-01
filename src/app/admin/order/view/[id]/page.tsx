"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {cancelOrder, findById} from "@/services/api/admin/order";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import {useState} from "react";
import {toast} from "react-hot-toast";
import NcModal from "@/shared/NcModal/NcModal";
import ButtonThird from "@/shared/Button/ButtonThird";
import NcImage from "@/shared/NcImage/NcImage";
import Prices from "@/components/Price/Prices";
import {OrderStatus} from "@/app/admin/order/orderStatus";
import {GuarantyPrice} from "@/hooks/GuarantyPrice";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ItemActions from "@/app/admin/order/view/[id]/ItemActions";

export default function Page() {
    const {id} = useParams();

    const {data: data, refetch} = useQuery({
        queryKey: [`order-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    const [openCancel, setOpenCancel] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);

    async function handleCancel() {
        setCancelLoading(true);
        try {
            const response = await cancelOrder({id: Number(id)});
            if (response?.success) {
                toast.success(response?.message as string);
                setOpenCancel(false);
                refetch();
            } else {
                toast.error(response?.message as string);
            }
        } finally {
            setCancelLoading(false);
        }
    }

    const handlePrint = () => {
        const printSection = document.getElementById('print');
        const originalContents = document.body.innerHTML;
        //@ts-ignore
        document.body.innerHTML = printSection.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
    };
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "سفارشات",
                href: "order"
            },
            {
                title: "مشاهده سفارش",
                href: "order/view/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                مشاهده سفارش
            </PageTitle>
            <div id="print" className="print-container">
                {/* اطلاعات خریدار و سفارش */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* اطلاعات مشتری */}
                    <div className="border border-gray-300 rounded-xl p-5 text-sm print:text-xs">
                        <h3 className="font-bold text-base mb-3 border-b pb-2">اطلاعات خریدار</h3>
                        <div className="space-y-2 text-gray-600">
                            <div className="flex justify-between">
                                <span>نام و نام خانوادگی:</span>
                                <span className="font-medium">{data?.orderInfo?.name} {data?.orderInfo?.last_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>کد ملی:</span>
                                <span>{data?.orderInfo?.national_code}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>موبایل:</span>
                                <span>{data?.orderInfo?.mobile}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>تلفن:</span>
                                <span>{data?.orderInfo?.tell}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>کد پستی:</span>
                                <span>{data?.orderInfo?.zip_code}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>استان:</span>
                                <span>{data?.orderInfo?.province?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>شهر:</span>
                                <span>{data?.orderInfo?.city?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>آدرس:</span>
                                <span className="text-right leading-tight">{data?.orderInfo?.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* اطلاعات سفارش */}
                    <div className="border border-gray-300 rounded-xl p-5 text-sm print:text-xs">
                        <h3 className="font-bold text-base mb-3 border-b pb-2">اطلاعات سفارش</h3>
                        <div className="space-y-2 text-gray-600">
                            <div className="flex justify-between">
                                <span>شماره سفارش:</span>
                                <span className="font-medium">#{data?.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>وضعیت:</span>
                                <span>{OrderStatus[Number(data?.status ?? 0)]}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>تاریخ ثبت:</span>
                                <span>{data?.order_date}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>تاریخ ارسال:</span>
                                <span>{data?.delivery_date}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>روش ارسال:</span>
                                <span>{data?.delivery?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>روش پرداخت:</span>
                                <span>{data?.payment?.name}</span>
                            </div>
                            {data?.delivery_token && (
                                <div className="flex justify-between">
                                    <span>کد پیگیری پستی:</span>
                                    <span className="font-medium">{data?.delivery_token}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* جدول محصولات */}
                <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse border border-gray-300 text-xs print:text-[10px]">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-3 py-2 text-center">تصویر</th>
                            <th className="border border-gray-300 px-3 py-2 text-center">نام محصول</th>
                            <th className="border border-gray-300 px-3 py-2 text-center">رنگ</th>
                            <th className="border border-gray-300 px-3 py-2 text-center">تعداد</th>
                            <th className="border border-gray-300 px-3 py-2 text-center">قیمت واحد</th>
                            <th className="border border-gray-300 px-3 py-2 text-center">تخفیف</th>
                            <th className="border border-gray-300 px-3 py-2 text-center">گارانتی</th>
                            <th className="border border-gray-300 px-3 py-2 text-center">هزینه گارانتی</th>
                            <th className="border border-gray-300 px-3 py-2 text-center">جمع کل</th>
                            <th className="border border-gray-300 px-3 py-2 text-center print:hidden">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.orderItems?.data.map((item: any) => (
                            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="border border-gray-300 p-2 text-center">
                                    <div className="w-16 h-16 mx-auto">
                                        <NcImage
                                            width={64}
                                            height={64}
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.product.images.data[0].url}`}
                                            className="object-contain"
                                        />
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-sm">{item.product.name}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.productColor.color_name}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center font-medium">{item.count}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                    <Prices price={item.price} />
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                    <Prices price={item.discount} />
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                    {item.guaranty?.name || "—"}
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                    {item.guaranty ?
                                        item.guaranty.free ?
                                            <span className="text-emerald-600">(رایگان)</span> :
                                            <Prices price={GuarantyPrice(item.price)} />
                                        : "—"
                                    }
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                                    <Prices price={item.final_price * item.count} />
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center print:hidden">
                                    <ItemActions item={item} onDone={refetch} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* خلاصه مالی - شامل کیف پول */}
                <div className="border border-gray-300 rounded-xl p-6 bg-gray-50 print:bg-white">
                    <h3 className="font-bold mb-4 text-base print:text-sm">خلاصه مالی</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm print:text-xs">
                        <div>
                            <span className="block text-gray-500 mb-1">قیمت محصولات</span>
                            <Prices price={data?.price} className="font-semibold" />
                        </div>

                        <div>
                            <span className="block text-gray-500 mb-1">هزینه ارسال</span>
                            <span className="font-medium">
                    {data?.delivery_price === 0 ? "رایگان" : <Prices price={data?.delivery_price} />}
                </span>
                        </div>

                        <div>
                            <span className="block text-gray-500 mb-1">مبلغ پرداختی</span>
                            <Prices price={data?.final_price} className="font-bold" />
                        </div>

                        <div>
                            <span className="block text-gray-500 mb-1">استفاده از کیف پول</span>
                            <Prices
                                price={data?.use_wallet_price || 0}
                                className="font-medium text-rose-600"
                            />
                        </div>

                        <div className="">
                            <span className="block text-gray-500 mb-1">مجموع نهایی</span>
                            <Prices
                                price={data?.total_price}
                                className="font-bold text-lg print:text-base"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Panel>
        <Panel>
            <div className="flex flex-wrap items-center gap-3">
                <ButtonPrimary
                    onClick={handlePrint}
                >
                    پرینت
                </ButtonPrimary>
                <ButtonPrimary
                    className="!bg-rose-600 hover:!bg-rose-700"
                    onClick={() => setOpenCancel(true)}
                >
                    کنسل کردن سفارش
                </ButtonPrimary>
            </div>
        </Panel>

        <NcModal
            isOpenProp={openCancel}
            onCloseModal={() => setOpenCancel(false)}
            hasButton={false}
            modalTitle="کنسل کردن سفارش"
            contentExtraClass="max-w-md"
            renderContent={() => (
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-600 leading-6">
                        آیا از کنسل کردن سفارش{" "}
                        <span className="font-medium text-gray-800">#{id}</span>{" "}
                        مطمئن هستید؟ این عملیات ممکن است قابل بازگشت نباشد.
                    </p>
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <ButtonThird onClick={() => setOpenCancel(false)}>
                            انصراف
                        </ButtonThird>
                        <ButtonPrimary
                            loading={cancelLoading}
                            disabled={cancelLoading}
                            onClick={handleCancel}
                            className="!bg-rose-600 hover:!bg-rose-700"
                        >
                            کنسل کردن سفارش
                        </ButtonPrimary>
                    </div>
                </div>
            )}
        />

    </>)
}
