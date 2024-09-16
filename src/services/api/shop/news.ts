import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {NewsResponse} from "@/services/types/news";

export const findNewsByUrl = async <T extends ServerResponse<NewsResponse>>
(url:string) => {
    return axios.post<T, SuccessResponseType<T>>("news/find",{url:url})
        .then((res) => res?.data?.result.data)
};
export const getNews = async <T extends ServerResponse<NewsResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("news/paginated")
        .then((res) => res?.data?.result)
};
