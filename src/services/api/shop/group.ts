import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {
    ProductPageResponse,
} from "@/services/types/product";

export const findGroupByUrl = async <T extends ServerResponse<ProductPageResponse>>
(
    url:string
) => {

    return axios.post<T, SuccessResponseType<T>>("group/find",{url:url})
        .then((res) => res?.data?.result?.data)
};
