import {FilterItemResponse} from "@/services/types/filterItem";
import { ProductFilterResponse } from "./productFilter";

export type FilterResponse = {
    id: number,
    name: string,
    type: string,
    items:{ data :FilterItemResponse[]},
    productFilters?:ProductFilterResponse
}
