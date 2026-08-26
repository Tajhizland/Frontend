import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";

export const getFavorite = async <T extends ServerResponse<ProductResponse[]>>
(page:number=1) => {
    return axios.get<T, SuccessResponseType<T>>("favorite?page="+page)
        .then((res) => res?.data?.result)
};
export const addToFavorite = async <T extends ServerResponse<unknown>>
(
    params: {
        productId: number
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("favorite" ,params)
        .then((res) => res?.data)
};
export const deleteFromFavorite = async <T extends ServerResponse<unknown>>
(
    params: {
        productId: number
    }
) => {
    return axios.delete<T, SuccessResponseType<T>>("favorite" ,{data: params})
        .then((res) => res?.data)
};
