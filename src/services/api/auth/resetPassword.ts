import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {TokenResponse, UnknownResponse} from "@/services/types/auth";
import {ResetPasswordResetPasswordDto, ResetPasswordResetPasswordSendCodeDto, ResetPasswordResetPasswordVerifyCodeDto} from "@/services/types/resetPassword";

export const resetPasswordSendCode = async <T extends ServerResponse<UnknownResponse>>
(dto: ResetPasswordResetPasswordSendCodeDto) => {
    return axios.post<T, SuccessResponseType<T>>("auth/reset-password/send-code", dto)
        .then((res) => res?.data)
};


export const resetPasswordVerifyCode = async <T extends ServerResponse<UnknownResponse>>
(dto: ResetPasswordResetPasswordVerifyCodeDto) => {
    return axios.post<T, SuccessResponseType<T>>("auth/reset-password/verify-code", dto)
        .then((res) => res?.data)
};


export const resetPassword = async <T extends ServerResponse<TokenResponse>>
(dto: ResetPasswordResetPasswordDto) => {
    return axios.post("auth/reset-password", dto)
        .then((res) => res?.data?.result?.data)
};

