import axios, {ServerResponse} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";

export const findProduct = async <T extends ServerResponse<ProductResponse>>
(
    url:string
) => {
    return axios.get("product/find/"+url)
        .then((res) => res?.data?.result)
};
