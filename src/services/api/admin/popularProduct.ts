import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PopularProductResponse} from "@/services/types/popularProduct";
import {tableFetcher} from "@/shared/Table/fetcher";

export const popularProductTable = tableFetcher<PopularProductResponse>("admin/popular_product/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        product_id: string,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/popular_product/add", params)
        .then((res) => res?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/popular_product/delete/"+id)
        .then((res) => res?.data)
};
