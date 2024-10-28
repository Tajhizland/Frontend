import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {DashboardResponse} from "@/services/types/dashboard";

export const dashboard = async <T extends ServerResponse<DashboardResponse>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/dashboard")
        .then((res) => res?.data?.result?.data)
};
