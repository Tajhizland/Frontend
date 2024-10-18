import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {FaqResponse} from "@/services/types/faq";

export const getFaq = async <T extends ServerResponse<FaqResponse[]>>
() => {
    return axios.post<T, SuccessResponseType<T>>("faq/get")
        .then((res) => res?.data?.result?.data)
};
