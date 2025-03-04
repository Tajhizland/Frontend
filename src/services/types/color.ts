import {ProductResponse} from "@/services/types/product";

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
    created_at: string,
    updated_at: string,
}
