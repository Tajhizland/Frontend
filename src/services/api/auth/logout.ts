import axios, {ServerResponse} from "@/services/axios";
import {TokenResponse} from "@/services/types/auth";

export const logout = async <T extends ServerResponse<unknown>>
(
) => {
    return axios.post<ServerResponse>("auth/logout")
        .then((res) => res?.data);
};
