 import {OrderResponse} from "@/services/types/order";
import {GuarantyPrice} from "@/hooks/GuarantyPrice";
 import Prices from "@/components/Price/Prices";

export default function FactorTable({order}: { order: OrderResponse }) {
    return (
        <div className="w-full">
            {/* جدول در دسکتاپ */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-xs text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-white">
                    <tr>
                        <th className="px-4 py-2 text-center">نام محصول</th>
                        <th className="px-4 py-2 text-center">رنگ</th>
                        <th className="px-4 py-2 text-center">تعداد</th>
                        <th className="px-4 py-2 text-center">قیمت</th>
                        <th className="px-4 py-2 text-center">تخفیف</th>
                        <th className="px-4 py-2 text-center">گارانتی</th>
                        <th className="px-4 py-2 text-center">قیمت گارانتی</th>
                        <th className="px-4 py-2 text-center">قیمت نهایی</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white text-black">
                    {order.orderItems?.data.map((item) => (
                        <tr key={item.id} className="bg-white border-b">
                            <td className="px-4 py-2 text-center flex flex-col gap-1">
                                <span>
                                {item.product.name}
                                </span>
                                <span className={"text-slate-600 "}>
                                {item?.guaranty?.name}
                                </span>
                            </td>
                            <td className="px-4 py-2 text-center">{item.productColor.color_name}</td>
                            <td className="px-4 py-2 text-center">{item.count}</td>
                            <td className="px-4 py-2 text-center">
                                <Prices price={item.price} priceClass="mx-auto" contentClass="border-orange-500"
                                        image={false}/>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <Prices price={item.discount} priceClass="mx-auto" contentClass="border-orange-500"
                                        image={false}/>
                            </td>
                            <td className="px-4 py-2 text-center">{item.guaranty?.name}</td>
                            <td className="px-4 py-2 text-center">
                                <Prices
                                    price={
                                        item.guaranty ? (   (item.guaranty.free==null || item.guaranty.free)  ? 0 : GuarantyPrice(item.price)) : 0
                                    }
                                    priceClass="mx-auto"
                                    contentClass="border-orange-500"
                                    image={false}
                                />
                            </td>
                            <td className="px-4 py-2 text-center">
                                <Prices price={item.final_price * item.count} priceClass="mx-auto"
                                        contentClass="border-orange-500" image={false}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr className="font-semibold text-gray-500 bg-white">
                        <th
                            scope="row"
                            colSpan={2}
                            className="px-6 py-3 text-center text-sm"
                        >
                            <div className="flex items-center gap-x-4 justify-center">
                                <span>قیمت محصولات :</span>
                                <span>
                    <Prices price={order?.price} priceClass="mx-auto " image={false}/>
                  </span>
                            </div>
                        </th>
                        <th
                            scope="row"
                            colSpan={2}
                            className="px-6 py-3 text-base text-center"
                        >
                            <div className="flex items-center gap-x-4 justify-center">
                                <span>هزینه ارسال :</span>
                                <span>
                    <Prices price={order?.delivery_price} priceClass="mx-auto " image={false}/>
                  </span>
                            </div>
                        </th>
                        <th
                            scope="row"
                            colSpan={3}
                            className="px-6 py-3 text-base text-center"
                        >
                            <div className="flex items-center gap-x-4 justify-center">
                                <span>مجموع :</span>
                                <span>
                    <Prices price={order?.final_price} priceClass="mx-auto " image={false}/>
                  </span>
                            </div>
                        </th>
                    </tr>
                    </tfoot>
                </table>
            </div>

            {/* نمایش کارت در موبایل */}
            <div className="block md:hidden space-y-4">
                {order.orderItems?.data.map((item) => (
                    <div key={item.id} className="bg-white px-4 pb-4 rounded-lg shadow-md border">
                        <p className="font-bold text-center py-2">{item.product.name}</p>
                        <hr/>
                        <div className="mt-2 text-sm">
                            <div className="grid grid-cols-2 gap-2">
                                <span className="font-semibold">رنگ:</span>
                                <span>{item.productColor.color_name}</span>
                                <span className="font-semibold">تعداد:</span>
                                <span>{item.count}</span>

                                <span className="font-semibold">قیمت:</span>
                                <span>
                  <Prices price={item.price} image={false}/>
                </span>

                                <span className="font-semibold">تخفیف:</span>
                                <span>
                  <Prices price={item.discount} image={false}/>
                </span>

                                <span className="font-semibold">گارانتی:</span>
                                <span>{item.guaranty?.name}</span>

                                <span className="font-semibold">قیمت گارانتی:</span>
                                <span>
                  <Prices
                      price={
                          item.guaranty
                              ? item.guaranty.free
                                  ? 0
                                  : GuarantyPrice(item.price)
                              : 0
                      }
                      image={false}
                  />
                </span>

                                <span className="font-semibold">قیمت نهایی:</span>
                                <span>
                  <Prices price={item.final_price * item.count} image={false}/>
                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
