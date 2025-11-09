import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CastResponse} from "@/services/types/cast";


export const paginatedCast = async <T extends ServerResponse<CastResponse[]>>
(page = 1) => {
    return axios.get<T, SuccessResponseType<T>>("cast?page=" + page)
        .then((res) => res?.data?.result)
};
export const findCast = async <T extends ServerResponse<CastResponse>>
(url: string
) => {
    return axios.post<T, SuccessResponseType<T>>("cast/find", {url: url})
        .then((res) => res?.data?.result?.data)
};