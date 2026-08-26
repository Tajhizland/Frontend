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
