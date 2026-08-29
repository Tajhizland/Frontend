import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {UserResponse} from "@/services/types/user";
import {OnHoldOrderResponse} from "@/services/types/onHoldOrder";
import {OrderResponse} from "@/services/types/order";
import {AddressResponse} from "@/services/types/address";
import {TokenResponse} from "@/services/types/auth";
import {tableFetcher} from "@/shared/Table/fetcher";
import {UserAdminChangeActiveAddressDto, UserAdminUpdateWalletDto, UserGetUserByTypeDto, UserUpdateAdminAddressDto, UserUpdateDto} from "@/services/types/user";

export const userTable = tableFetcher<UserResponse>("admin/user/dataTable");
export const adminUserTable = tableFetcher<UserResponse>("admin/user/admin/dataTable");

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: UserUpdateDto) => {
    return axios.put<T, SuccessResponseType<T>>("admin/user/" + id, dto)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<UserResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/user/" + id)
        .then((res) => res?.data?.result?.data)
};
export const getAddress = async <T extends ServerResponse<AddressResponse[]>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/user/" + id + "/address")
        .then((res) => res?.data?.result?.data)
};
export const getOrder = async <T extends ServerResponse<OrderResponse[]>>
(
    id: number | string,
    page: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/user/" + id + "/order?page=" + page)
        .then((res) => res?.data?.result)
};
export const getOnHoldOrder = async <T extends ServerResponse<OnHoldOrderResponse[]>>
(
    id: number | string,
    page: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/user/" + id + "/on-hold-order?page=" + page)
        .then((res) => res?.data?.result)
};

export const updateAdminAddress = async <T extends ServerResponse<unknown>>
(id: number | null | undefined, dto: UserUpdateAdminAddressDto) => {
    // بدون id، بکند به جای ویرایش آدرس، یک آدرس جدید می‌سازد.
    return axios.post<T, SuccessResponseType<T>>("admin/user/address", {...dto, id: Number.isFinite(id) ? id : null})
        .then((res) => res?.data)
};
export const adminChangeActiveAddress = async <T extends ServerResponse<unknown>>
(id: number, dto: UserAdminChangeActiveAddressDto) => {
    // id همان شناسه آدرسی است که باید فعال شود و بکند بدون آن findOrFail را روی null اجرا می‌کرد.
    return axios.patch<T, SuccessResponseType<T>>("admin/user/address/active", {...dto, id})
        .then((res) => res?.data)
};
export const adminUpdateWallet = async <T extends ServerResponse<unknown>>
(dto: UserAdminUpdateWalletDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/user/wallet", dto)
        .then((res) => res?.data)
};
export const adminLoginUser = async <T extends ServerResponse<TokenResponse>>
(id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/user/" + id + "/login")
        .then((res) => res?.data?.result?.data)
};

export const getUserByType = async <T extends ServerResponse<UserResponse[]>>
(dto: UserGetUserByTypeDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/user/type", dto)
        .then((res) => res?.data?.result?.data)
};
