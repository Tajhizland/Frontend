import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {AddressResponse, AddressUpdateDto} from "@/services/types/address";


export const findActive = async <T extends ServerResponse<AddressResponse>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("address/active")
        .then((res) => res?.data.result.data)
};
export const getAllAddress = async <T extends ServerResponse<AddressResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("address")
        .then((res) => res?.data.result.data)
};
export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: AddressUpdateDto) => {
    return axios.post<T, SuccessResponseType<T>>("address" , dto)
        .then((res) => res?.data)
};

export const changeActiveAddress = async <T extends ServerResponse<unknown>>
(id: number) => {
    return axios.patch<T, SuccessResponseType<T>>("address/active", {id})
        .then((res) => res?.data)
};
