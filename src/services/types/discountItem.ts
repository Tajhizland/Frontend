import {ColorResponse} from "@/services/types/color";

export type DiscountItemResponse = {
    id: number,
    product_color_id: number,
    discount_price: number,
    productColor?: ColorResponse,
    created_at: string,
    updated_at: string,
}
