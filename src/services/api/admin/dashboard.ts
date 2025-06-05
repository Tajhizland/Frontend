import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {DashboardResponse} from "@/services/types/dashboard";

export const dashboard = async <T extends ServerResponse<DashboardResponse>>
(
    fromDate: string,
    toDate: string,
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/dashboard?fromDate=" + fromDate + "&toDate=" + toDate)
        .then((res) => res?.data?.result?.data)
};
