export type DiscountResponse = {
    id: number,
    status: number;
    title: string;
    start_date: string;
    end_date: string;
    start_date_fa: string;
    end_date_fa: string;
    created_at: string,
    updated_at: string,
}

export interface DiscountStoreDto {
    title: string;
    status: number;
    start_date: string;
    end_date: string;
}

export interface DiscountUpdateDto {
    title: string;
    status: number;
    start_date: string;
    end_date: string;
}

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
