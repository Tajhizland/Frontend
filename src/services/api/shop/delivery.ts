import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {DeliveryResponse} from "@/services/types/delivery";

export const get = async <T extends ServerResponse<DeliveryResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("delivery")
        .then((res) => res?.data?.result?.data)
};
export const select = async <T extends ServerResponse<unknown>>
(id: number) => {
    return axios.patch<T, SuccessResponseType<T>>("delivery/select", {id})
        .then((res) => res?.data)
};
