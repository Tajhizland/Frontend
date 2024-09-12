import { ProductOptionResponse } from "./productOption";

export type OptionItemsResponse = {
    id: number;
    option_id: number;
    productOption?:ProductOptionResponse;
    title: string;
    status: number;
    created_at: string;
    updated_at: string;
};
