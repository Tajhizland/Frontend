import {FilterItemResponse} from "@/services/types/filterItem";
import { ProductFilterResponse } from "./productFilter";

export type FilterResponse = {
    id: number|string,
    name: string,
    status: number,
    type: string,
    items: FilterItemResponse[],
    productFilters?:ProductFilterResponse
}

export interface FilterSetDto {
    product_id:string|number;
    filter:{
            id:string,
            item_id:string,

        }[];
}

export interface FilterSetToCategoryDto {
    category_id: number | string;
    filter: {
                id?: number,
                name: string,
                status: number,
                item: {
                    id?: number,
                    value: string,
                    status: number
                }[]
            }[];
}
