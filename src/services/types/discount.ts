import {Identified, Timestamps} from "@/services/http";
export interface DiscountBase {
    title: string;
    status: number;
    start_date: string;
    end_date: string;
}

export interface DiscountResponse extends DiscountBase, Identified, Timestamps {
    start_date_fa: string;
    end_date_fa: string;
}

export interface DiscountStoreDto extends DiscountBase {}

export type DiscountUpdateDto = DiscountStoreDto;

export interface DiscountSetItemDto {
    discount_id: number;
    discount: {
            product_color_id: number,
            discount_price: number,
            top: number,
            discount_expire_time?: string,
        }[];
}

export interface DiscountUpdateItemDto {
    discount: {
            id: number,
            discount_price: number,
        }[];
}
