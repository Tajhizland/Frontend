import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PaymentResponse} from "@/services/types/payment";

export const paymentRequest = async <T extends ServerResponse<PaymentResponse>>
(useWallet: boolean, shippingMethod: number, shippingPrice: number, code?: string, gateway?: number) => {
    return axios.post<T, SuccessResponseType<T>>("payment/request", {
        wallet: useWallet,
        shippingMethod: shippingMethod,
        code: code,
        shippingPrice: shippingPrice,
        gateway: gateway
    })
        .then((res) => res?.data?.result?.data)
};

export const paymentByWallet = async <T extends ServerResponse<PaymentResponse>>
() => {
    return axios.post<T, SuccessResponseType<T>>("payment/wallet")
        .then((res) => res?.data?.result?.data)
};

export type SnappayEligibleResponse = {
    successful: boolean;
    response: {
        eligible: boolean;
        title_message: string;
        description: string;
    };
};

export const snappayEligible = async <T extends ServerResponse<SnappayEligibleResponse>>
(
    params: { amount: number }
) => {
    return axios.post<T, SuccessResponseType<T>>("payment/snappay/eligible", params)
        .then((res) => res?.data?.result?.data?.response)
};
