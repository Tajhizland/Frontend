import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {HeaderSearchResponse, SearchResponse} from "@/services/types/serach";
import {ProductResponse} from "@/services/types/product";
import {SearchSearchDto} from "@/services/types/search";

export const search = async <T extends ServerResponse<HeaderSearchResponse>>
(dto: SearchSearchDto) => {
    return axios.post<T, SuccessResponseType<T>>("search", dto)
        .then((res) => res?.data?.result)
};
export const searchPaginate = async <T extends ServerResponse<ProductResponse[]>>
(
    query: string,
    page = 1
) => {
    return axios.post<T, SuccessResponseType<T>>("search/paginate?page=" + page, {query: query})
        .then((res) => res?.data?.result)
};
