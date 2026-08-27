import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {SmsLogResponse} from "@/services/types/smsLog";
import {SmsLogItemResponse} from "@/services/types/smsLogItem";
import {tableFetcher} from "@/shared/Table/fetcher";
import {SmsSmsSendDto, SmsSmsSendToContactDto} from "@/services/types/sms";

export const smsTable = tableFetcher<SmsLogResponse>("admin/sms/dataTable");

/** fetcher آیتم‌های یک پیامک خاص — id را بگیر و fetcher بساز */
export const smsItemTable = (id: string | string[] | undefined) =>
    tableFetcher<SmsLogItemResponse>("admin/sms/" + id + "/item");

export const smsSend = async <T extends ServerResponse<unknown>>
(dto: SmsSmsSendDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/sms/send", dto)
        .then((res) => res?.data)
};
export const smsSendToContact = async <T extends ServerResponse<unknown>>
(dto: SmsSmsSendToContactDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/sms/send-to-contact", dto)
        .then((res) => res?.data)
};
