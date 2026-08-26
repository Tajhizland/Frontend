import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
 import {OnHoldCheckoutResponse, OnHoldOrderResponse} from "@/services/types/onHoldOrder";
import {PaymentResponse} from "@/services/types/payment";
import {DeliveryResponse} from "@/services/types/delivery";
import {CouponResponse} from "@/services/types/coupon";

export const myOnHoldOrder = async <T extends ServerResponse<OnHoldOrderResponse[]>>
(
    page: number = 1
) => {
    return axios.get<T, SuccessResponseType<T>>("on-hold-order?page=" + page)
        .then((res) => res?.data?.result)
};

export const payment = async <T extends ServerResponse<PaymentResponse>>
(id: number
) => {
    return axios.post<T, SuccessResponseType<T>>("on-hold-order/" + id + "/payment")
        .then((res) => res?.data?.result?.data)
};

export const paymentByWallet = async <T extends ServerResponse<PaymentResponse>>
(id: number
) => {
    return axios.post<T, SuccessResponseType<T>>("on-hold-order/" + id + "/wallet")
        .then((res) => res?.data?.result?.data)
};


export const onHoldCheckout = async <T extends ServerResponse<OnHoldCheckoutResponse>>
(id: number) => {
    return axios.get<T, SuccessResponseType<T>>("on-hold-order/" + id + "/checkout")
        .then((res) => res?.data?.result?.data)
};

export const onHoldDelivery = async <T extends ServerResponse<DeliveryResponse[]>>
(id: number) => {
    return axios.get<T, SuccessResponseType<T>>(`on-hold-order/${id}/checkout/delivery`)
        .then((res) => res?.data?.result?.data)
};

export const onHoldCheckCoupon = async <T extends ServerResponse<CouponResponse>>
(id: number, code: string) => {
    return axios.post<T, SuccessResponseType<T>>(`on-hold-order/${id}/checkout/coupon`, {code: code})
        .then((res) => res?.data?.result?.data)
};

export const onHoldCheckoutPayment = async <T extends ServerResponse<PaymentResponse>>
(
    id: number,
    params: {
        wallet: boolean,
        shippingMethod: number,
        code?: string,
        gateway: number,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>(`on-hold-order/${id}/checkout/payment`, params)
        .then((res) => res?.data?.result?.data)
};
