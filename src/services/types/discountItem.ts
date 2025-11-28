import {ColorResponse} from "@/services/types/color";
import {DiscountResponse} from "@/services/types/discount";

export type DiscountItemResponse = {
    id: number,
    product_color_id: number,
    discount_price: number,
    productColor?: ColorResponse,
    discount?: DiscountResponse,
    created_at: string,
    updated_at: string,
}
