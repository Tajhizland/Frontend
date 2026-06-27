import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {SmsLogResponse} from "@/services/types/smsLog";
import {SmsLogItemResponse} from "@/services/types/smsLogItem";
import {tableFetcher} from "@/shared/Table/fetcher";

export const smsTable = tableFetcher<SmsLogResponse>("admin/sms/dataTable");

/** fetcher آیتم‌های یک پیامک خاص — id را بگیر و fetcher بساز */
export const smsItemTable = (id: string | string[] | undefined) =>
    tableFetcher<SmsLogItemResponse>("admin/sms/item/" + id);

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
