import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {UserResponse} from "@/services/types/user";

export const me = async <T extends ServerResponse<UserResponse>>
() => {
    return axios.get<T, SuccessResponseType<T>>("auth/me")
        .then((res) => res.data.result.data);
};
export const chatInfo = async <T extends ServerResponse<unknown>>
(params: { token: string }) => {
    return axios.post<T, SuccessResponseType<T>>("goftino/sync", params)
        .then((res) => res.data.result.data);
};


export const update = async <T extends ServerResponse<unknown>>
(params: {
    name: string,
    email: string,
    gender: string,
    last_name: string,
    national_code: string,
    avatar: File | undefined
}) => {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("email", params.email);
    formData.append("last_name", params.last_name);
    formData.append("national_code", params.national_code);
    formData.append("gender", params.gender);
    if (params.avatar)
        formData.append("avatar", params.avatar);
    return axios.post<T, SuccessResponseType<T>>("auth/update", formData)
        .then((res) => res?.data);
};

