"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import { findById } from "@/services/api/admin/order";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import NcImage from "@/shared/NcImage/NcImage";

export default function Page() {
    const { id } = useParams();

    const { data: data } = useQuery({
        queryKey: [`order-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

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
        ]} />
        <Panel>
            <PageTitle>
                مشاهده سفارش
            </PageTitle>
            <div>
                <div className="border rounded-2xl p-5  text-sm">
                    <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 text-gray-500">
                        <div className="flex gap-x-2  justify-center">
                            <span>نام : </span>
                            <span>{data?.orderInfo?.name}</span>
                        </div>
                        <div className="flex gap-x-2  justify-center">
                            <span>موبایل : </span>
                            <span>{data?.orderInfo?.mobile}</span>
                        </div>
                        <div className="flex gap-x-2  justify-center">
                            <span >تلفن : </span>
                            <span>{data?.orderInfo?.tell}</span>
                        </div>
                        <div className="flex gap-x-2  justify-center">
                            <span>کد پستی : </span>
                            <span>{data?.orderInfo?.zip_code}</span>
                        </div>
                        <div className="flex gap-x-2  justify-center">
                            <span>آدرس : </span>
                            <span>{data?.orderInfo?.address}</span>
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
                            <th className="px-4 py-2  whitespace-nowrap text-center">قیمت نهایی</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.orderItems?.data.map((item) => (<>
                                <tr className="bg-white border-b">
                                    <th className="px-4 py-2  whitespace-nowrap text-center">
                                        <div className="w-32 h-32">
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
                                        {item.price}
                                    </th>
                                    <th className="px-4 py-2  whitespace-nowrap text-center">{item.dicount}</th>
                                    <th className="px-4 py-2  whitespace-nowrap text-center">{item.final_price}</th>
                                </tr>
                            </>))
                        }

                    </tbody>
                    <tfoot>
                        <tr className="font-semibold text-gray-700 ">
                            <th scope="row" colSpan={3} className="px-6 py-3 text-base text-center">مجموع</th>
                            <td className="px-6 py-3 text-center">3</td>
                            <td className="px-6 py-3 text-center">3</td>
                            <td className="px-6 py-3 text-center">3</td>
                            <td className="px-6 py-3 text-center">3</td> 
                        </tr>
                    </tfoot>
                </table>
            </div>
        </Panel>

    </>)
}
