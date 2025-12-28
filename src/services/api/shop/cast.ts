import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CastListingResponse, CastResponse} from "@/services/types/cast";


export const paginatedCast = async <T extends ServerResponse<CastListingResponse>>
(page = 1, filter: string) => {
    return axios.get<T, SuccessResponseType<T>>("cast?page=" + page)
        .then((res) => res?.data?.result?.data)
};
export const findCast = async <T extends ServerResponse<CastResponse>>
(url: string
) => {
    return axios.post<T, SuccessResponseType<T>>("cast/find", {url: url})
        .then((res) => res?.data?.result?.data)
};