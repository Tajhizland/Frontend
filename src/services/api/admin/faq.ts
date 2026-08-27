import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BrandResponse} from "@/services/types/brand";
import {FaqResponse} from "@/services/types/faq";
import {tableFetcher} from "@/shared/Table/fetcher";
import {FaqStoreDto, FaqUpdateDto} from "@/services/types/faq";

export const faqTable = tableFetcher<FaqResponse>("admin/faq/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: FaqStoreDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/faq", dto)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: FaqUpdateDto) => {

    return axios.put<T, SuccessResponseType<T>>("admin/faq/" + id, dto)
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<FaqResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/faq/" + id)
        .then((res) => res?.data?.result?.data)
};
