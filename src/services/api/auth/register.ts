import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {UnknownResponse, TokenResponse} from "@/services/types/auth";

export const registerSendCode = async <T extends ServerResponse<UnknownResponse>>
(
    params: {
        mobile?: string;
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("auth/register/send_code", params)
        .then((res) => res?.data)
};


export const registerVerifyCode = async <T extends ServerResponse<UnknownResponse>>
(
    params: {
        mobile: string;
        code: string;
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("auth/register/verify_code", params)
        .then((res) => res?.data)
};


export const registerUser = async <T extends ServerResponse<TokenResponse>>
(
    params: {
        mobile: string;
        name: string;
        last_name: string;
        national_code: string;
        password: string;
        password_confirmation: string;
    }
) => {
    return axios.post("auth/register", params)
        .then((res) => res?.data?.result?.data)
};

