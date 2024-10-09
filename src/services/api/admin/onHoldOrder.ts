import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {OnHoldOrderResponse} from "@/services/types/onHoldOrder";

export const findById = async <T extends ServerResponse<OnHoldOrderResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/onHoldOrder/find/"+id )
        .then((res) => res?.data?.result?.data)
};
export const accept = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/onHoldOrder/accept", params)
        .then((res) => res?.data)
};
export const reject = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/onHoldOrder/reject", params)
        .then((res) => res?.data)
};
