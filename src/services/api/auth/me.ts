import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {UserResponse} from "@/services/types/user";

export const me = async <T extends ServerResponse<UserResponse>>
(  ) => {
    return axios.get<T, SuccessResponseType<T>>("auth/me")
        .then((res) => res.data.result.data);
};
