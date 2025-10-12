import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";

export const smsSend = async <T extends ServerResponse<unknown>>
(
    params: {
        message: string,
        userIds: number[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/sms/send", params)
        .then((res) => res?.data)
};
export const smsSendToContact = async <T extends ServerResponse<unknown>>
(
    params: {
        message: string,
        mobiles: string[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/sms/send-to-contact", params)
        .then((res) => res?.data)
};
