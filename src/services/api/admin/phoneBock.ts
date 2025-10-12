import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PermissionResponse} from "@/services/types/permission";
import {PhoneBockResponse} from "@/services/types/phoneBock";

export const storePhoneBock = async <T extends ServerResponse<unknown>>
(
    params: {
        name: string,
        mobile: string,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/phone-bock/store", params)
        .then((res) => res?.data);
};

export const updatePhoneBock = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        name: string,
        mobile: string,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/phone-bock/update", params)
        .then((res) => res?.data);
};
export const findPhoneBockById = async <T extends ServerResponse<PhoneBockResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/phone-bock/find/" + id)
        .then((res) => res?.data?.result?.data)
};
export const getPhoneBockList = async <T extends ServerResponse<PhoneBockResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/phone-bock/all")
        .then((res) => res?.data?.result?.data)
};
