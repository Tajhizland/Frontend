import axios, {ServerResponse} from "@/services/axios";
import {TokenResponse} from "@/services/types/auth";

export const login = async <T extends ServerResponse<TokenResponse>>
(
    params?: {
        username?: string;
        password?: string;
    }
) => {
    return axios.post("auth/login", params)
        .then((res) => res?.data);
};
