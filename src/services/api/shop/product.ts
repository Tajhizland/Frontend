import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductPageResponse, ProductResponse} from "@/services/types/product";

export const findProductByUrl = async <T extends ServerResponse<ProductPageResponse>>
(
    url:string
) => {

    return axios.post<T, SuccessResponseType<T>>("product/find",{url:url})
        .then((res) => res?.data?.result?.data)
};
