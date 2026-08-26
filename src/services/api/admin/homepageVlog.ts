import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {HomepageVlogResponse} from "@/services/types/homepageVlog";


export const updateHomepageVlog = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        vlogId: number,
    }
) => {

    return axios.put<T, SuccessResponseType<T>>("admin/homepage-vlog/" + params.id, params)
        .then((res) => res?.data);
};

export const getHomepageVlog = async <T extends ServerResponse<HomepageVlogResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/homepage-vlog")
        .then((res) => res?.data?.result?.data)
};
