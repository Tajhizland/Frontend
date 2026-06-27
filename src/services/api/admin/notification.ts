import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {NotificationResponse} from "@/services/types/notification";
import {tableFetcher} from "@/shared/Table/fetcher";

export const notificationTable = tableFetcher<NotificationResponse>("admin/notification/dataTable");

export const unseen = async <T extends ServerResponse<NotificationResponse[]>>
( ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/notification/unseen")
        .then((res) => res?.data?.result?.data)
};

export const seen = async <T extends ServerResponse<unknown>>
( ) => {
    return axios.post<T, SuccessResponseType<T>>("admin/notification/seen")
        .then((res) => res?.data)
};
