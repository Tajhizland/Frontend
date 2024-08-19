import {FilterItemResponse} from "@/services/types/filterItem";

export type FilterResponse = {
    id: number,
    name: string,
    type: string,
    items: FilterItemResponse[],
}
