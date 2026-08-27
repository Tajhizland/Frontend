import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ChargeChargeRequestDto} from "@/services/types/charge";
 import {PaymentResponse} from "@/services/types/payment";

export const chargeRequest = async <T extends ServerResponse<PaymentResponse>>
(dto: ChargeChargeRequestDto) => {

    return axios.post<T, SuccessResponseType<T>>("charge", dto)
        .then((res) => res?.data?.result?.data)
};
