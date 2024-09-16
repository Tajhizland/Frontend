import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";

export const findProductByUrl = async <T extends ServerResponse<ProductResponse>>
(
    url:string
) => {

    return axios.post<T, SuccessResponseType<T>>("product/find",{url:url})
        .then((res) => res?.data?.result?.data)
};
