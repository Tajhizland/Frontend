import axios from "@/services/axios";
import {CheckResponse, OtpSendResponse, OtpVerifyResponse} from "@/services/types/auth";

export const checkMobile = async (
    params: {
        mobile: string;
    }
): Promise<CheckResponse> => {
    return axios.post("auth/check", params)
        .then((res) => res?.data?.result?.data);
};


export const otpSend = async (
    params: {
        mobile: string;
    }
): Promise<OtpSendResponse> => {
    return axios.post("auth/otp/send", params)
        .then((res) => res?.data?.result?.data);
};


export const otpVerify = async (
    params: {
        mobile: string;
        code: string;
    }
): Promise<OtpVerifyResponse> => {
    return axios.post("auth/otp/verify", params)
        .then((res) => res?.data?.result?.data);
};
