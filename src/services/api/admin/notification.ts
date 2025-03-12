import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {NotificationResponse} from "@/services/types/notification";

export const unseen = async <T extends ServerResponse<NotificationResponse[]>>
( ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/notification/unseen")
        .then((res) => res?.data?.result?.data)
};

export const seen = async <T extends ServerResponse<unknown>>
( ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/notification/seen")
        .then((res) => res?.data)
};
