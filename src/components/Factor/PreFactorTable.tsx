import {CartResponse} from "@/services/types/cart";
 import {GuarantyPrice} from "@/hooks/GuarantyPrice";
import Prices from "@/components/Price/Prices";

export default function PreFactorTable({cart}: { cart: CartResponse[] }) {
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
                        <th className="px-4 py-2 text-center">قیمت پس از تخفیف</th>
                        <th className="px-4 py-2 text-center">هزینه گارانتی</th>
                        <th className="px-4 py-2 text-center">قیمت نهایی</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white text-black">
                    {cart.map((item) => (
                        <tr key={item.id} className="border-b">
                            <td className="px-4 py-2 text-center flex flex-col gap-1">
                                <span>
                                {item.product.name}
                                    </span>
                                <span className={"text-slate-600 "}>
                                {item?.guaranty?.name}
                                    </span>
                            </td>
                            <td className="px-4 py-2 text-center">{item.color.title}</td>
                            <td className="px-4 py-2 text-center">{item.count}</td>
                            <td className="px-4 py-2 text-center">
                                <Prices price={item.color.price} priceClass="mx-auto" contentClass="border-orange-500" image={false}/>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <Prices price={item.color.discountedPrice} priceClass="mx-auto"
                                        contentClass="border-orange-500" image={false}/>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <Prices price={item.guaranty.free ? 0 : GuarantyPrice(item.color.price)}
                                        priceClass="mx-auto" contentClass="border-orange-500" image={false}/>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <Prices
                                    price={item.color.discountedPrice * item.count + (item.guaranty.free ? 0 : GuarantyPrice(item.color.price) ?? 0)}
                                    priceClass="mx-auto" contentClass="border-orange-500" image={false}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* نمایش کارت در موبایل */}
            <div className="block md:hidden space-y-4">
                {cart.map((item) => (
                    <div key={item.id} className="bg-white px-4 pb-4 rounded-lg shadow-md border">
                        <p className="font-bold text-center py-2">{item.product.name}</p>
                        <hr/>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <span className="font-semibold">رنگ:</span>
                            <span>{item.color.title}</span>
                            <span className="font-semibold">تعداد:</span>
                            <span>{item.count}</span>

                            <span className="font-semibold">قیمت:</span>
                            <span><Prices price={item.color.price}/></span>

                            <span className="font-semibold">قیمت پس از تخفیف:</span>
                            <span><Prices price={item.color.discountedPrice}/></span>

                            <span className="font-semibold">هزینه گارانتی:</span>
                            <span><Prices price={item.guaranty.free ? 0 : GuarantyPrice(item.color.price)}/></span>

                            <span className="font-semibold">قیمت نهایی:</span>
                            <span>
                                <Prices
                                    price={item.color.discountedPrice * item.count + (item.guaranty.free ? 0 : GuarantyPrice(item.color.price) ?? 0)}/>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
