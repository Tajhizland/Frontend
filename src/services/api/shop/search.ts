import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {SearchResponse} from "@/services/types/serach";
import {ProductResponse} from "@/services/types/product";

export const search = async <T extends ServerResponse<ProductResponse[]>>
(
    params: {
        query: string
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("search", params)
        .then((res) => res?.data?.result)
};
export const searchPaginate = async <T extends ServerResponse<ProductResponse[]>>
(
    query: string,
    page = 1
) => {
    return axios.post<T, SuccessResponseType<T>>("search/paginate?page=" + page, {query: query})
        .then((res) => res?.data?.result)
};
