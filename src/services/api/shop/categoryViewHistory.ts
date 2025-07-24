import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";

export const storeCategoryViewHistory = async <T extends ServerResponse<unknown>>
(params: {
     category_id: number
 }
) => {

    return axios.post<T, SuccessResponseType<T>>("category-view-history/store", params)
        .then((res) => res?.data)
};

export const storeCategoryViewHistoryIp = async <T extends ServerResponse<unknown>>
(params: {
     category_id: number
 }
) => {

    return axios.post<T, SuccessResponseType<T>>("category-view-history/store-ip", params)
        .then((res) => res?.data)
};

export const suggestProduct = async <T extends ServerResponse<ProductResponse[]>>
(
) => {

    return axios.get<T, SuccessResponseType<T>>("category-view-history/suggest")
        .then((res) => res?.data?.result?.data)
};

export const suggestIpProduct = async <T extends ServerResponse<ProductResponse[]>>
(
) => {

    return axios.get<T, SuccessResponseType<T>>("category-view-history/suggest-ip")
        .then((res) => res?.data?.result?.data)
};
