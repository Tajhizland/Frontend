import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PageResponse} from "@/services/types/page";

export const findPageByUrl = async <T extends ServerResponse<PageResponse>>
(url:string) => {
    return axios.post<T, SuccessResponseType<T>>("page/find",{url:url})
        .then((res) => res?.data?.result.data)
};
