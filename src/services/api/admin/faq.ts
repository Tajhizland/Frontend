import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BrandResponse} from "@/services/types/brand";
import {FaqResponse} from "@/services/types/faq";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        question: string,
        answer: string,
        status: number | string,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/faq/store", params)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string,
        question: string,
        answer: string,
        status: number | string,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/faq/update", params)
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<FaqResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/faq/find/" + id)
        .then((res) => res?.data?.result?.data)
};
