import { OptionItemsResponse } from "./optionItem";

export type OptionResponse = {
    id: number;
    category_id: number;
    title: string;
    optionItems?: OptionItemsResponse[];
    status: number;
    created_at: string;
    updated_at: string;
};

export interface OptionStoreDto {
    title: string;
    status: number | string;
    category_id: number | string;
}

export interface OptionUpdateDto {
    title: string;
    status: number | string;
    category_id: number | string;
}

export interface OptionSetDto {
    product_id: string | number;
    option: {
            value: string,
            item_id: string,

        }[];
}

export interface OptionSetToCategoryDto {
    category_id: number | string;
    option: {
            id?: number | undefined,
            title: string,
            status: number,
            item: {
                id?: number,
                title: string,
                status: number
            }[]
        }[];
}
