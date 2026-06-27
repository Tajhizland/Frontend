import axios, {ServerResponse, SuccessResponseType} from "@/services/axios"; 
import {VlogCategoryResponse} from "@/services/types/vlogCategory";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";

export const vlogCategoryTable = tableFetcher<VlogCategoryResponse>("admin/vlog_category/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name: string,
        url: string,
        icon?: File | null,
        status: number,
        setProgress?: (progress: number) => void,
    }
) => {

    const formData = new FormData();
    formData.append('name', params.name);
    formData.append('url', params.url);
    if (params.icon)
        formData.append('icon', params.icon);
    formData.append('status', params.status.toString());

    return axios.post<T, SuccessResponseType<T>>("admin/vlog_category/store", formData, uploadConfig(params.setProgress))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string,
        name: string,
        url: string,
        icon?: File | null,
        status: number,
        setProgress?: (progress: number) => void,
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('name', params.name);
    formData.append('url', params.url);
    if (params.icon)
        formData.append('icon', params.icon);
    formData.append('status', params.status.toString());

    return axios.post<T, SuccessResponseType<T>>("admin/vlog_category/update", formData, uploadConfig(params.setProgress))
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<VlogCategoryResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/vlog_category/find/" + id)
        .then((res) => res?.data?.result?.data)
};

export const getList = async <T extends ServerResponse<VlogCategoryResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/vlog_category/list")
        .then((res) => res?.data?.result?.data)
};


export const sortVlogCategory = async <T extends ServerResponse<unknown>>
(
    param: {
        vlogs: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/vlog_category/sort",param)
        .then((res) => res?.data)
};
