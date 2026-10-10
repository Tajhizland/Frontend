import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {GuarantyResponse} from "@/services/types/guaranty";

export const findByUrl = async <T extends ServerResponse<GuarantyResponse>>
(url:string
) => {

    return axios.post<T, SuccessResponseType<T>>("guaranty/find" , {url:url}, {pageRead: true, maxRedirects: 0})
        .then((res) => res?.data?.result?.data)
};
