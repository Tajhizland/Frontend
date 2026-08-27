import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {UserResponse} from "@/services/types/user";
import {MeChatInfoDto, MeUpdateDto} from "@/services/types/me";
import {toFormData} from "@/services/http";

export const me = async <T extends ServerResponse<UserResponse>>
() => {
    return axios.get<T, SuccessResponseType<T>>("auth/me")
        .then((res) => res.data.result.data);
};
export const chatInfo = async <T extends ServerResponse<unknown>>
(dto: MeChatInfoDto) => {
    return axios.post<T, SuccessResponseType<T>>("goftino/sync", dto)
        .then((res) => res.data.result.data);
};


export const update = async <T extends ServerResponse<unknown>>
(dto: MeUpdateDto) => {
    return axios.post<T, SuccessResponseType<T>>("auth/me", toFormData(dto, "PUT"))
        .then((res) => res?.data);
};

