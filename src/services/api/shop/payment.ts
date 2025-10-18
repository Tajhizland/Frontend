import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PaymentResponse} from "@/services/types/payment";

export const paymentRequest = async <T extends ServerResponse<PaymentResponse>>
(useWallet: boolean, shippingMethod: number) => {
    return axios.post<T, SuccessResponseType<T>>("payment/request", {wallet: useWallet, shippingMethod: shippingMethod})
        .then((res) => res?.data?.result?.data)
};

export const paymentByWallet = async <T extends ServerResponse<PaymentResponse>>
() => {
    return axios.post<T, SuccessResponseType<T>>("payment/wallet")
        .then((res) => res?.data?.result?.data)
};
