import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {OnHoldOrderResponse} from "@/services/types/onHoldOrder";
import {OrderResponse} from "@/services/types/order";
import {tableFetcher} from "@/shared/Table/fetcher";

export const onHoldOrderTable = tableFetcher<OnHoldOrderResponse>("admin/on-hold-order/dataTable");

export const findById = async <T extends ServerResponse<OrderResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/on-hold-order/"+id )
        .then((res) => res?.data?.result?.data)
};
export const accept = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string
    }
) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/on-hold-order/" + params.id + "/accept")
        .then((res) => res?.data)
};
export const reject = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string
    }
) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/on-hold-order/" + params.id + "/reject")
        .then((res) => res?.data)
};
