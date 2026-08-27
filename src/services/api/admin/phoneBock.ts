import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PermissionResponse} from "@/services/types/permission";
import {PhoneBockResponse} from "@/services/types/phoneBock";
import {tableFetcher} from "@/shared/Table/fetcher";
import {PhoneBockPhoneBockUploadExcelDto, PhoneBockStorePhoneBockDto, PhoneBockUpdatePhoneBockDto} from "@/services/types/phoneBock";
import {toFormData} from "@/services/http";

export const phoneBockTable = tableFetcher<PhoneBockResponse>("admin/phone-bock/dataTable");

export const storePhoneBock = async <T extends ServerResponse<unknown>>
(dto: PhoneBockStorePhoneBockDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/phone-bock", dto)
        .then((res) => res?.data);
};

export const updatePhoneBock = async <T extends ServerResponse<unknown>>
(id: number, dto: PhoneBockUpdatePhoneBockDto) => {

    return axios.put<T, SuccessResponseType<T>>("admin/phone-bock/" + id, dto)
        .then((res) => res?.data);
};
export const findPhoneBockById = async <T extends ServerResponse<PhoneBockResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/phone-bock/" + id)
        .then((res) => res?.data?.result?.data)
};
export const getPhoneBockList = async <T extends ServerResponse<PhoneBockResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/phone-bock/all")
        .then((res) => res?.data?.result?.data)
};
export const phoneBockUploadExcel = async <T extends ServerResponse<PhoneBockResponse[]>>
(dto: PhoneBockPhoneBockUploadExcelDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/phone-bock/excel", toFormData(dto),
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => res?.data)
};
