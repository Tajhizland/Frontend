import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductPageResponse, ProductResponse} from "@/services/types/product";

export const findProductByUrl = async <T extends ServerResponse<ProductPageResponse>>
(
    url:string
) => {

    return axios.post<T, SuccessResponseType<T>>("product/find",{url:url})
        .then((res) => res?.data?.result?.data)
};
export const getDiscountedProducts = async <T extends ServerResponse<ProductResponse[]>>
( page=1) => {

    return axios.get<T, SuccessResponseType<T>>("product/discount?page="+page)
        .then((res) => res?.data?.result)
};
export const getSpecialProductsPaginate = async <T extends ServerResponse<ProductResponse[]>>
( page=1) => {

    return axios.get<T, SuccessResponseType<T>>("special/list?page="+page)
        .then((res) => res?.data?.result)
};
