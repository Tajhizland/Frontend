import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {SliderResponse} from "@/services/types/slider";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";
import {SliderStoreDto, SliderUpdateDto} from "@/services/types/slider";
import {UploadProgress, toFormData} from "@/services/http";

export const sliderTable = tableFetcher<SliderResponse>("admin/slider/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: SliderStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/slider", toFormData(dto), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: SliderUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/slider/" + id, toFormData(dto, "PUT"), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<SliderResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/slider/" + id)
        .then((res) => res?.data?.result?.data)
};
export const removeSlider = async <T extends ServerResponse<SliderResponse>>
(
    id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/slider/" + id)
        .then((res) => res?.data)
};
export const getMobileSliders = async <T extends ServerResponse<SliderResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/slider/all-mobile")
        .then((res) => res?.data?.result)
};
export const getDesktopSliders = async <T extends ServerResponse<SliderResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/slider/all-desktop")
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
    return axios.post<T, SuccessResponseType<T>>("admin/slider/sort",param)
        .then((res) => res?.data)
};
