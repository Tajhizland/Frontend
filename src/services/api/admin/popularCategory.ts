import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PopularCategoryResponse} from "@/services/types/popularCategory";
import {tableFetcher} from "@/shared/Table/fetcher";
import {PopularCategoryStoreDto} from "@/services/types/popularCategory";

export const popularCategoryTable = tableFetcher<PopularCategoryResponse>("admin/popular-category/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: PopularCategoryStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/popular-category", dto)
        .then((res) => res?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/popular-category/"+id)
        .then((res) => res?.data)
};
