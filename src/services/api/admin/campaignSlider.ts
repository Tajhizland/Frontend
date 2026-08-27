import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CampaignSliderResponse} from "@/services/types/campaignSlider";
import {SliderResponse} from "@/services/types/slider";
import {tableFetcher} from "@/shared/Table/fetcher";
import {CampaignSliderStoreDto, CampaignSliderUpdateDto} from "@/services/types/campaignSlider";
import {toFormData} from "@/services/http";

/** fetcher اسلایدرهای یک کمپین خاص — id را بگیر و fetcher بساز */
export const campaignSliderTable = (id: string | string[] | undefined) =>
    tableFetcher<SliderResponse>("admin/campaign-slider/dataTable/" + id);

export const store = async <T extends ServerResponse<unknown>>
(dto: CampaignSliderStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/campaign-slider", toFormData(dto), {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: CampaignSliderUpdateDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/campaign-slider/" + id, toFormData(dto, "PUT"), {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<CampaignSliderResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/campaign-slider/" + id)
        .then((res) => res?.data?.result?.data)
};
export const removeSlider = async <T extends ServerResponse<CampaignSliderResponse>>
(
    id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/campaign-slider/" + id)
        .then((res) => res?.data)
};
export const getMobileSliders = async <T extends ServerResponse<CampaignSliderResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/campaign-slider/all-mobile")
        .then((res) => res?.data?.result)
};
export const getDesktopSliders = async <T extends ServerResponse<CampaignSliderResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/campaign-slider/all-desktop")
        .then((res) => res?.data?.result)
};

export const sortSlider = async <T extends ServerResponse<unknown>>
(
    param:{
        slider: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/campaign-slider/sort",param)
        .then((res) => res?.data)
};
