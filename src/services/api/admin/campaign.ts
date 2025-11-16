import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CampaignResponse} from "@/services/types/campaign";


export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title: string,
        color: string,
        logo: File,
        banner?: File,
        status: number,
        start_date: string,
        end_date: string,
        setProgress?: (progress: number) => void

    }
) => {

    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('color', params.color);
    formData.append('start_date', params.start_date);
    formData.append('end_date', params.end_date);
    formData.append('status', params.status.toString());
    formData.append('logo', params.logo);
    if (params.banner)
        formData.append('banner', params.banner);

    return axios.post<T, SuccessResponseType<T>>("admin/campaign/store", formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (params.setProgress) params.setProgress(percentCompleted);
            }
        })
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        title: string,
        color: string,
        logo?: File,
        banner?: File,
        status: number,
        start_date: string,
        end_date: string,
        setProgress?: (progress: number) => void
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('title', params.title);
    formData.append('color', params.color);
    formData.append('start_date', params.start_date);
    formData.append('end_date', params.end_date);
    formData.append('status', params.status.toString());
    if (params.logo)
        formData.append('logo', params.logo);
    if (params.banner)
        formData.append('banner', params.banner);
    return axios.post<T, SuccessResponseType<T>>("admin/campaign/update", formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }, onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (params.setProgress) params.setProgress(percentCompleted);
            }
        })
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<CampaignResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/campaign/find/" + id)
        .then((res) => res?.data?.result?.data)
};
