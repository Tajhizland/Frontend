import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CampaignBannerResponse} from "@/services/types/campaignBanner";
import {SliderResponse} from "@/services/types/slider";
import {tableFetcher} from "@/shared/Table/fetcher";
import {CampaignBannerStoreDto, CampaignBannerUpdateDto} from "@/services/types/campaignBanner";
import {toFormData} from "@/services/http";

/** fetcher بنرهای یک کمپین خاص — id را بگیر و fetcher بساز */
export const campaignBannerTable = (id: string | string[] | undefined) =>
    tableFetcher<SliderResponse>("admin/campaign-banner/dataTable/" + id);

export const store = async <T extends ServerResponse<unknown>>
(dto: CampaignBannerStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/campaign-banner", toFormData(dto))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: CampaignBannerUpdateDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/campaign-banner/" + id, toFormData(dto, "PUT"))
        .then((res) => res?.data);
};

export const deleteBanner = async <T extends ServerResponse<unknown>>
(
    id: number | string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/campaign-banner/" + id)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<CampaignBannerResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/campaign-banner/" + id)
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
