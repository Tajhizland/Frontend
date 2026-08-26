import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PopularCategoryResponse} from "@/services/types/popularCategory";
import {tableFetcher} from "@/shared/Table/fetcher";

export const popularCategoryTable = tableFetcher<PopularCategoryResponse>("admin/popular-category/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        category_id: string,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/popular-category", params)
        .then((res) => res?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/popular-category/"+id)
        .then((res) => res?.data)
};
