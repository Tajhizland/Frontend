import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";

export const smsSend = async <T extends ServerResponse<unknown>>
(
    params: {
        type: string,
        message: string,
        userIds: number[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/sms/send", params)
        .then((res) => res?.data)
};
