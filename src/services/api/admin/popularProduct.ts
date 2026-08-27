import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PopularProductResponse} from "@/services/types/popularProduct";
import {tableFetcher} from "@/shared/Table/fetcher";
import {PopularProductStoreDto} from "@/services/types/popularProduct";

export const popularProductTable = tableFetcher<PopularProductResponse>("admin/popular-product/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: PopularProductStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/popular-product", dto)
        .then((res) => res?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/popular-product/"+id)
        .then((res) => res?.data)
};
