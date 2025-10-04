import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {UserResponse} from "@/services/types/user";
import {OnHoldOrderResponse} from "@/services/types/onHoldOrder";
import {OrderResponse} from "@/services/types/order";
import {AddressResponse} from "@/services/types/address";
import {TokenResponse} from "@/services/types/auth";


export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number;
        name: string;
        last_name: string;
        national_code: string;
        username: string;
        email: string;
        gender: string;
        role: string;
        role_id?: number;
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
    return axios.get<T, SuccessResponseType<T>>("admin/user/on-hold-order/" + id + "?page=" + page)
        .then((res) => res?.data?.result)
};

export const updateAdminAddress = async <T extends ServerResponse<unknown>>
(params: {
     id?: number,
     user_id: number,
     city_id: string,
     title: string,
     province_id: string,
     tell: string,
     mobile: string,
     zip_code: string,
     address: string,
 }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/user/address/update", params)
        .then((res) => res?.data)
};
export const adminChangeActiveAddress = async <T extends ServerResponse<unknown>>
(params: {
     id: number,
     user_id: number,
 }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/user/address/active/change", params)
        .then((res) => res?.data)
};
export const adminUpdateWallet = async <T extends ServerResponse<unknown>>
(params: {
     wallet: number,
     user_id: number,
 }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/user/wallet", params)
        .then((res) => res?.data)
};
export const adminLoginUser = async <T extends ServerResponse<TokenResponse>>
(id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/user/login/" + id)
        .then((res) => res?.data?.result?.data)
};
