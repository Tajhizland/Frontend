import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {DeliveryResponse} from "@/services/types/delivery";

export const get = async <T extends ServerResponse<DeliveryResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("delivery/get")
        .then((res) => res?.data?.result?.data)
};
export const select = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("delivery/select",params)
        .then((res) => res?.data)
};
