import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CampaignResponse} from "@/services/types/campaign";
import {tableFetcher} from "@/shared/Table/fetcher";
import {CampaignStoreDto, CampaignUpdateDto} from "@/services/types/campaign";
import {UploadProgress, toFormData} from "@/services/http";

export const campaignTable = tableFetcher<CampaignResponse>("admin/campaign/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: CampaignStoreDto, onProgress?: UploadProgress) => {

    return axios.post<T, SuccessResponseType<T>>("admin/campaign", toFormData(dto),
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) onProgress(percentCompleted);
            }
        })
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: CampaignUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/campaign/" + id, toFormData(dto, "PUT"),
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }, onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) onProgress(percentCompleted);
            }
        })
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<CampaignResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/campaign/" + id)
        .then((res) => res?.data?.result?.data)
};
