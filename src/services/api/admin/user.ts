import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {UserResponse} from "@/services/types/user";
import {OnHoldOrderResponse} from "@/services/types/onHoldOrder";
import {OrderResponse} from "@/services/types/order";
import {AddressResponse} from "@/services/types/address";


export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number;
        name: string;
        username: string;
        email: string;
        gender: string;
        role: string;
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/user/update", params)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<UserResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/user/find/" + id)
        .then((res) => res?.data?.result?.data)
};
export const getAddress = async <T extends ServerResponse<AddressResponse[]>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/user/address/" + id)
        .then((res) => res?.data?.result?.data)
};
export const getOrder = async <T extends ServerResponse<OrderResponse[]>>
(
    id: number | string,
    page: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/user/order/" + id + "?page=" + page)
        .then((res) => res?.data?.result)
};
export const getOnHoldOrder = async <T extends ServerResponse<OnHoldOrderResponse[]>>
(
    id: number | string,
    page: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/user/find/" + id + "?page=" + page)
        .then((res) => res?.data?.result)
};
