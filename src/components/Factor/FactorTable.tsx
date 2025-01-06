import Prices from "@/components/Prices";
import {OrderResponse} from "@/services/types/order";
import {GuarantyPrice} from "@/hooks/GuarantyPrice";

export default function FactorTable({order}: { order: OrderResponse }) {
    return (<>
        <div className="relative overflow-x-auto">
            <table className="w-full text-xs text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-white  ">
                <tr>
                    <th className="px-4 py-2  whitespace-nowrap text-center">نام محصول</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center">رنگ</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center">تعداد</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center">قیمت</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center">تخفیف</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center"> گارانتی</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center">قیمت گارانتی</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center">قیمت نهایی</th>
                </tr>
                </thead>
                <tbody className={"bg-white text-black "}>
                {
                    order.orderItems?.data.map((item) => (<>
                        <tr className="bg-white border-b">

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
                                <Prices price={item.price} priceClass={"mx-auto"}
                                        contentClass={"border-orange-500"}/>
                            </th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">
                                <Prices price={item.discount} priceClass={"mx-auto"}
                                        contentClass={"border-orange-500"}/>
                            </th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">
                                {item.guaranty?.name}
                            </th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">
                                <Prices price={
                                    item.guaranty?
                                        item.guaranty.free?0:GuarantyPrice(item.price)
                                        :0
                                }
                                        priceClass={"mx-auto"}
                                        contentClass={"border-orange-500"}/>
                            </th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">
                                <Prices price={item.final_price * item.count} priceClass={"mx-auto"}
                                        contentClass={"border-orange-500"}/>
                            </th>
                        </tr>
                    </>))
                }
                </tbody>
                <tfoot>
                <tr className="font-semibold text-gray-500 bg-white ">
                    <th scope="row" colSpan={2} className="px-6 py-3 text-center text-sm">
                        <div className={"flex items-center gap-x-4 justify-center"}>
                                <span>
                                    قیمت محصولات :
                                </span>
                            <span>
                                  <Prices price={order?.price} priceClass={"mx-auto "}/>
                                </span>
                        </div>
                    </th>
                    <th scope="row" colSpan={2} className="px-6 py-3 text-base text-center">
                        <div className={"flex items-center gap-x-4 justify-center"}>
                                <span>
                                    هزینه ارسال :
                                </span>
                            <span>
                                        <Prices price={order?.delivery_price} priceClass={"mx-auto "}/>
                                 </span>
                        </div>
                    </th>
                    <th scope="row" colSpan={3} className="px-6 py-3 text-base text-center">
                        <div className={"flex items-center gap-x-4 justify-center"}>
                                <span>
                                    مجموع :
                                </span>
                            <span>
                                     <Prices price={order?.final_price} priceClass={"mx-auto "}/>
                                </span>
                        </div>
                    </th>
                </tr>
                </tfoot>
            </table>
        </div>

    </>)
}
