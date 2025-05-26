import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
 import {PaymentResponse} from "@/services/types/payment";

export const chargeRequest = async <T extends ServerResponse<PaymentResponse>>
(params: {
     amount: number
 }
) => {

    return axios.post<T, SuccessResponseType<T>>("charge/request", params)
        .then((res) => res?.data?.result?.data)
};
