import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {
    DiscountedProductPageResponse,
    ProductPageResponse,
    ProductResponse,
    SpecialProductPageResponse
} from "@/services/types/product";

export const findProductByUrl = async <T extends ServerResponse<ProductPageResponse>>
(
    url:string
) => {

    return axios.post<T, SuccessResponseType<T>>("product/find",{url:url})
        .then((res) => res?.data?.result?.data)
};
export const getDiscountedProducts = async <T extends ServerResponse<DiscountedProductPageResponse>>
( page=1 , filter="") => {

    return axios.get<T, SuccessResponseType<T>>("product/discount?page="+page+"&"+filter)
        .then((res) => res?.data?.result?.data)
};
export const getSpecialProductsPaginate = async <T extends ServerResponse<SpecialProductPageResponse[]>>
( page=1) => {

    return axios.get<T, SuccessResponseType<T>>("special/list?page="+page)
        .then((res) => res?.data?.result?.data)
};
