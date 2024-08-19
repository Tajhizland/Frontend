import axios, {ServerResponse} from "@/services/axios";
import {UnknownResponse, TokenResponse} from "@/services/types/auth";

export const registerSendCode = async <T extends ServerResponse<UnknownResponse>>
(
    params: {
        mobile?: string;
    }
) => {
    return axios.post("auth/register/send_code", {params})
        .then((res) => res?.data?.result)
};


export const registerVerifyCode = async <T extends ServerResponse<UnknownResponse>>
(
    params: {
        mobile: string;
        code: string;
    }
) => {
    return axios.post("auth/register/verify_code", {params})
        .then((res) => res?.data?.result)
};


export const register = async <T extends ServerResponse<TokenResponse>>
(
    params: {
        mobile: string;
        password: string;
    }
) => {
    return axios.post("auth/register", {params})
        .then((res) => res?.data?.result)
};

