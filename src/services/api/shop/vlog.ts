import axios, { ServerResponse, SuccessResponseType } from "@/services/axios";
import { VlogListingResponse, VlogPageResponse, VlogResponse } from "@/services/types/vlog";

export const findVlogByUrl = async <T extends ServerResponse<VlogPageResponse>>
    (url: string) => {
    return axios.post<T, SuccessResponseType<T>>("vlog/find", { url: url })
        .then((res) => res?.data?.result.data)
};
export const getVlogPaginated = async <T extends ServerResponse<VlogListingResponse>>
    (page: number, filters?: string) => {
    return axios.get<T, SuccessResponseType<T>>("vlog/listing?" + "page=" + page + "&" + filters)
        .then((res) => res?.data?.result?.data)
};
export const getVlogByCategoryPaginated = async <T extends ServerResponse<VlogListingResponse>>
    (url: string, page: number, filters?: string) => {
    return axios.post<T, SuccessResponseType<T>>("vlog/get?" + "page=" + page + "&" + filters, { url: url })
        .then((res) => res?.data?.result?.data)
};
