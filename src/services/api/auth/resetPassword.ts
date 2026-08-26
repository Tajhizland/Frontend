import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {TokenResponse, UnknownResponse} from "@/services/types/auth";

export const resetPasswordSendCode = async <T extends ServerResponse<UnknownResponse>>
(
    params: {
        mobile?: string;
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("auth/reset-password/send-code", params)
        .then((res) => res?.data)
};


export const resetPasswordVerifyCode = async <T extends ServerResponse<UnknownResponse>>
(
    params: {
        mobile: string;
        code: string;
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("auth/reset-password/verify-code", params)
        .then((res) => res?.data)
};


export const resetPassword = async <T extends ServerResponse<TokenResponse>>
(
    params: {
        mobile: string;
        password: string;
        password_confirmation: string;
    }
) => {
    return axios.post("auth/reset-password", params)
        .then((res) => res?.data?.result?.data)
};

