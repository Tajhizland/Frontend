import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CategoryListing} from "@/services/types/category";

export const storeComment = async <T extends ServerResponse<unknown>>
(
    params:{
        productId:string;
        rating:string;
        text:string;
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("comment/submit",params )
        .then((res) => res?.data)
};