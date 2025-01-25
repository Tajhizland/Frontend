import {CartResponse} from "@/services/types/cart";
import Prices from "@/components/Prices";
import { GuarantyPrice } from "@/hooks/GuarantyPrice";

export default function PreFactorTable({cart}: { cart: CartResponse[] }) {
    return (<>

        <div className="relative w-[1000px]">
            <table className="w-full text-xs text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-white ">
                <tr>
                    <th className="px-4 py-2  whitespace-nowrap text-center">نام محصول</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center">رنگ</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center">تعداد</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center">قیمت</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center">قیمت پس از تخفیف</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center">هزینه گارانتی</th>
                    <th className="px-4 py-2  whitespace-nowrap text-center">قیمت نهایی</th>
                </tr>
                </thead>
                <tbody className={"bg-white text-black "}>
                {
                    cart.map((item) => (<>
                        <tr className="  border-b">
                            <th className="px-4 py-2  whitespace-nowrap text-center">
                                        <span>
                                            {item.product.name}
                                        </span>
                            </th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">
                                        <span>
                                            {item.color.title}
                                        </span>
                            </th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">
                                {item.count}
                            </th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">
                                <Prices price={item.color.price} priceClass={"mx-auto "}
                                        contentClass={"border-orange-500"}/>
                            </th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">
                                <Prices price={item.color.discountedPrice} priceClass={"mx-auto "}
                                        contentClass={"border-orange-500"}/>
                            </th>
                            <th className="px-4 py-2  whitespace-nowrap text-center">
                                <Prices price={item.guaranty.free?0:GuarantyPrice(item.color.price)} priceClass={"mx-auto "}
                                        contentClass={"border-orange-500"}/>
                            </th>

                            <th className="px-4 py-2  whitespace-nowrap text-center">
                                <Prices price={item.color.discountedPrice * item.count +  (item.guaranty.free?0:GuarantyPrice(item.color.price)??0)} priceClass={"mx-auto "}
                                        contentClass={"border-orange-500"}/>
                            </th>
                        </tr>
                    </>))
                }

                </tbody>
                <tfoot>
                <tr className="font-semibold text-gray-500 bg-white ">
                    <th scope="row" colSpan={4} className="px-6 py-3 text-base text-center">
                    </th>
                    <th scope="row" colSpan={3} className="px-6 py-3 text-base text-center">
                    </th>
                </tr>
                </tfoot>
            </table>
        </div>
    </>)
}
