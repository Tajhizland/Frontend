import {ColorResponse} from "@/services/types/color";

export type DiscountItemResponse = {
    id: number,
    product_color_id: number,
    discount: number,
    productColor?: ColorResponse,
    created_at: string,
    updated_at: string,
}
