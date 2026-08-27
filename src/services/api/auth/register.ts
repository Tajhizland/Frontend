import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {UnknownResponse, TokenResponse} from "@/services/types/auth";
import {RegisterRegisterSendCodeDto, RegisterRegisterUserDto, RegisterRegisterVerifyCodeDto} from "@/services/types/register";

export const registerSendCode = async <T extends ServerResponse<UnknownResponse>>
(dto: RegisterRegisterSendCodeDto) => {
    return axios.post<T, SuccessResponseType<T>>("auth/register/send-code", dto)
        .then((res) => res?.data)
};


export const registerVerifyCode = async <T extends ServerResponse<UnknownResponse>>
(dto: RegisterRegisterVerifyCodeDto) => {
    return axios.post<T, SuccessResponseType<T>>("auth/register/verify-code", dto)
        .then((res) => res?.data)
};


export const registerUser = async <T extends ServerResponse<TokenResponse>>
(dto: RegisterRegisterUserDto) => {
    return axios.post("auth/register", dto)
        .then((res) => res?.data?.result?.data)
};

