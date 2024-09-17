import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {NewsResponse} from "@/services/types/news";

export const findNewsByUrl = async <T extends ServerResponse<NewsResponse>>
(url:string) => {
    return axios.post<T, SuccessResponseType<T>>("news/find",{url:url})
        .then((res) => res?.data?.result.data)
};
export const getNewsPaginated = async <T extends ServerResponse<NewsResponse[]>>
(page:number) => {
    return axios.get<T, SuccessResponseType<T>>("news/paginated?page="+page)
        .then((res) => res?.data?.result)
};
