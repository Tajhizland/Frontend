"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {findById} from "@/services/api/admin/order";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import NcImage from "@/shared/NcImage/NcImage";
import Prices from "@/components/Price/Prices";
import {OrderStatus} from "@/app/admin/order/orderStatus";
import {GuarantyPrice} from "@/hooks/GuarantyPrice";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function Page() {
    const {id} = useParams();

    const {data: data} = useQuery({
        queryKey: [`order-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
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
            <div id={"print"}>
                <div className={"grid grid-cols-1  lg:grid-cols-2 gap-5 "}>
                    <div className="border rounded-2xl px-5  text-sm">
                        <div className="flex flex-col divide-y   text-gray-500">

                            <div className="flex py-2 justify-between">
                                <span>نام : </span>
                                <span>{data?.orderInfo?.name}</span>
                            </div>
                            <div className="flex  py-2 justify-between">
                                <span>موبایل : </span>
                                <span>{data?.orderInfo?.mobile}</span>
                            </div>
                            <div className="flex  py-2 justify-between">
                                <span>تلفن : </span>
                                <span>{data?.orderInfo?.tell}</span>
                            </div>
                            <div className="flex  py-2 justify-between">
                                <span>کد پستی : </span>
                                <span>{data?.orderInfo?.zip_code}</span>
                            </div>

                            <div className="flex  py-2 justify-between">
                                <span>استان : </span>
                                <span>{data?.orderInfo?.province?.name}</span>
                            </div>
                            <div className="flex  py-2 justify-between">
                                <span>شهر : </span>
                                <span>{data?.orderInfo?.city?.name}</span>
                            </div>
                            <div className="flex  py-2 justify-between">
                                <span>آدرس : </span>
                                <span>{data?.orderInfo?.address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-2xl px-5  text-sm">
                        <div className="flex flex-col divide-y   text-gray-500">
                            <div className="flex py-2 justify-between">
                                <span>شماره سفارش : </span>
                                <span>{data?.id}</span>
                            </div>
                            <div className="flex py-2 justify-between">
                                <span>وضعیت : </span>
                                <span>{OrderStatus[Number(data?.status ?? 0)]}</span>
                            </div>
                            <div className="flex py-2 justify-between">
                                <span>تاریخ : </span>
                                <span>{data?.order_date}</span>
                            </div>
                            <div className="flex py-2 justify-between">
                                <span>تاریخ ارسال: </span>
                                <span>{data?.delivery_date}</span>
                            </div>
                            <div className="flex py-2 justify-between">
                                <span>روش ارسال: </span>
                                <span>{data?.delivery?.name}</span>
                            </div>
                            <div className="flex py-2 justify-between">
                                <span>روش پرداخت: </span>
                                <span>{data?.payment?.name}</span>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">

                        <tr>
                            <th className="px-4 py-2  whitespace-nowrap text-center">تصویر</th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">نام محصول</th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">رنگ</th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">تعداد</th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">قیمت</th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">تخفیف</th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">گارانتی</th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">قیمت گارانتی</th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">قیمت نهایی</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data?.orderItems?.data.map((item) => (<>
                                <tr className="bg-white border-b">
                                    <th className="px-4 py-2  whitespace-nowrap text-center">
                                        <div className="w-32 h-32 mx-auto">
                                            <NcImage
                                                width={100}
                                                height={100}
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.product.images.data[0].url}`}
                                            />
                                        </div>
                                    </th>
                                    <th className="px-4 py-2  whitespace-nowrap text-center">
                                        <span>
                                            {item.product.name}
                                        </span>
                                    </th>
                                    <th className="px-4 py-2  whitespace-nowrap text-center">
                                        <span>
                                            {item.productColor.color_name}
                                        </span>
                                    </th>
                                    <th className="px-4 py-2  whitespace-nowrap text-center">
                                        {item.count}
                                    </th>
                                    <th className="px-4 py-2  whitespace-nowrap text-center">
                                        <Prices price={item.price} priceClass={"mx-auto text-orange-500"}
                                                contentClass={"border-orange-500"}/>
                                    </th>
                                    <th className="px-4 py-2  whitespace-nowrap text-center">
                                        <Prices price={item.discount} priceClass={"mx-auto text-orange-500"}
                                                contentClass={"border-orange-500"}/>
                                    </th>
                                    <th className="px-4 py-2  whitespace-nowrap text-center">
                                        {item.guaranty?.name}
                                    </th>
                                    <th className="px-4 py-2  whitespace-nowrap text-center">
                                        {
                                            item.guaranty ?
                                                item.guaranty?.free ?
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                                    (رایگان)
                                                </span>
                                                    :
                                                    <Prices priceClass="text-xs text-slate-500 dark:text-slate-400"
                                                            price={GuarantyPrice(item.price)}/>
                                                :
                                                <Prices priceClass="text-xs text-slate-500 dark:text-slate-400"
                                                        price={GuarantyPrice(0)}/>
                                        }
                                    </th>

                                    <th className="px-4 py-2  whitespace-nowrap text-center">
                                        <Prices price={item.final_price * item.count}
                                                priceClass={"mx-auto text-orange-500"}
                                                contentClass={"border-orange-500"}/>
                                    </th>
                                </tr>
                            </>))
                        }

                        </tbody>
                        <tfoot>
                        <tr className="font-semibold text-gray-500   bg-gray-100 ">
                            <th scope="row" colSpan={2} className="px-6 py-3 text-center text-sm">
                                <div className={"flex items-center gap-x-4 justify-center"}>
                                <span>
                                    قیمت محصولات :
                                </span>
                                    <span>
                                  <Prices price={data?.price} priceClass={"mx-auto "}/>
                                </span>
                                </div>
                            </th>
                            <th scope="row" colSpan={2} className="px-6 py-3 text-base text-center">
                                <div className={"flex items-center gap-x-4 justify-center"}>
                                <span>
                                    هزینه ارسال :
                                </span>
                                    <span>
                                        <Prices price={data?.delivery_price} priceClass={"mx-auto "}/>
                                 </span>
                                </div>
                            </th>
                            <th scope="row" colSpan={3} className="px-6 py-3 text-base text-center">
                                <div className={"flex items-center gap-x-4 justify-center"}>
                                <span>
                                    مجموع :
                                </span>
                                    <span>
                                     <Prices price={data?.final_price} priceClass={"mx-auto "}/>
                                </span>
                                </div>
                            </th>

                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </Panel>
        <Panel>
            <ButtonPrimary
                onClick={handlePrint}
            >
                پرینت
            </ButtonPrimary>
        </Panel>

    </>)
}
