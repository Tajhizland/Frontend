import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {HomepageVlogResponse} from "@/services/types/homepageVlog";


export const updateHomepageVlog = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        vlogId: number,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/homepage_vlog/update", params)
        .then((res) => res?.data);
};

export const getHomepageVlog = async <T extends ServerResponse<HomepageVlogResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/homepage_vlog/get")
        .then((res) => res?.data?.result?.data)
};
