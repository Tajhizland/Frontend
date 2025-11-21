import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CampaignBannerResponse} from "@/services/types/campaignBanner";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        campaign_id: number,
        url: string,
        type: string,
        image: File,
    }
) => {
    const formData = new FormData();
    formData.append('campaign_id', params.campaign_id.toString());
    formData.append('url', params.url);
    formData.append('type', params.type);
    formData.append('image', params.image);

    return axios.post<T, SuccessResponseType<T>>("admin/campaign-banner/store", formData)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        url: string,
        type: string,
        image: File | undefined,
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('url', params.url);
    formData.append('type', params.type);
    if (params.image) {
        formData.append('image', params.image);
    }
    return axios.post<T, SuccessResponseType<T>>("admin/campaign-banner/update", formData)
        .then((res) => res?.data);
};

export const deleteBanner = async <T extends ServerResponse<unknown>>
(
    id: number | string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/campaign-banner/delete/" + id)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<CampaignBannerResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/campaign-banner/find/" + id)
        .then((res) => res?.data?.result?.data)
};

export const getBannerList = async <T extends ServerResponse<CampaignBannerResponse[]>>
(type: string) => {
    return axios.get<T, SuccessResponseType<T>>("admin/campaign-banner/list/" + type)
        .then((res) => res?.data?.result)
};
export const sortBanner = async <T extends ServerResponse<unknown>>
(
    param: {
        banner: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/campaign-banner/sort", param)
        .then((res) => res?.data)
};
