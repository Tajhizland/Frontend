import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";

export const find = async <T extends ServerResponse<ProductResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("compare/find/" + id)
        .then((res) => res?.data?.result?.data)
};
export const search = async <T extends ServerResponse<ProductResponse[]>>
(
    params: {
        query: string,
        categoryIds: number[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("compare/search",params)
        .then((res) => res?.data?.result?.data)
};
export const allProduct = async <T extends ServerResponse<ProductResponse[]>>
(
    params: {
        categoryIds: number[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("compare/category/product",params)
        .then((res) => res?.data?.result?.data)
};
