import axios, { ServerResponse, SuccessResponseType } from "@/services/axios";
import { UserResponse } from "@/services/types/user";

export const me = async <T extends ServerResponse<UserResponse>>
    () => {
    return axios.get<T, SuccessResponseType<T>>("auth/me")
        .then((res) => res.data.result.data);
};


export const update = async <T extends ServerResponse<unknown>>
    (params: {
        name: string,
        email: string,
        gender: string,
        province: string,
        city: string,
        address: string,
        avatar: File | undefined
    }) => {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("email", params.email);
    formData.append("gender", params.gender);
    formData.append("province", params.province);
    formData.append("city", params.city);
    formData.append("address", params.address);
    if (params.avatar)
        formData.append("avatar", params.avatar);
    return axios.post<T, SuccessResponseType<T>>("auth/update", formData)
        .then((res) => res.data);
};

