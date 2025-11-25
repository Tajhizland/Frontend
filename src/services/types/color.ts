import {ProductResponse} from "@/services/types/product";
import {DiscountItemResponse} from "@/services/types/discountItem";

export type ColorResponse = {
    id: number,
    product_id: number,
    color_name: string,
    color_code: string,
    status: number,
    statusLabel: string,
    price: number,
    discountedPrice: number,
    discount_expire_time: string,
    discount_expire_time_fa: string,
    discount: number,
    simple_discount: number,
    delivery_delay: number,
    stock: number,
    product?: ProductResponse,
    discountItem?: { data: DiscountItemResponse[] },
    created_at: string,
    updated_at: string,
}
