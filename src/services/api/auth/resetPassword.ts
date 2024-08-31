import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {TokenResponse, UnknownResponse} from "@/services/types/auth";

export const resetPasswordSendCode = async <T extends ServerResponse<UnknownResponse>>
(
    params: {
        mobile?: string;
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("auth/reset_password/send_code", params)
        .then((res) => res?.data)
};


export const resetPasswordVerifyCode = async <T extends ServerResponse<UnknownResponse>>
(
    params: {
        mobile: string;
        code: string;
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("auth/reset_password/verify_code", params)
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
    return axios.post("auth/reset_password", params)
        .then((res) => res?.data)
};

