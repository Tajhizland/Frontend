import axios, {ServerResponse} from "@/services/axios";
import {NewsResponse} from "@/services/types/news";

export const findNews = async <T extends ServerResponse<NewsResponse>>
(url:string) => {
    return axios.get("news/find/"+url)
        .then((res) => res?.data?.result)
};
export const getNews = async <T extends ServerResponse<NewsResponse>>
() => {
    return axios.get("news/paginated")
        .then((res) => res?.data?.result)
};
