import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
 import {OnHoldOrderResponse} from "@/services/types/onHoldOrder";
import {PaymentResponse} from "@/services/types/payment";

export const myOnHoldOrder = async <T extends ServerResponse<OnHoldOrderResponse[]>>
(
    page: number = 1
) => {
    return axios.get<T, SuccessResponseType<T>>("on-hold-order/get?page=" + page)
        .then((res) => res?.data?.result)
};

export const payment = async <T extends ServerResponse<PaymentResponse>>
(id: number
) => {
    return axios.post<T, SuccessResponseType<T>>("on-hold-order/payment/" + id)
        .then((res) => res?.data?.result?.data)
};

