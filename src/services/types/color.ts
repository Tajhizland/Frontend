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
    discountItem?: DiscountItemResponse[],
    created_at: string,
    updated_at: string,
}

export interface ColorSetDto {
    product_id:string|number;
    color:{
            id:string,
            name:string,
            code:string,
            price:number|string,
            discount:number|string,
            stock:number|string,
            status:number|string,
            delivery_delay:number|string,
            discount_expire_time:string,
        }[];
}

export interface ColorUpdateColorPriceDto {
    color:{
            id:number,
            price:number,
            discount:number,
            status:number,
            stock:number,
            delivery_delay:number,
            discount_expire_time:string,
        }[];
}
