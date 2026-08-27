import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PosterResponse} from "@/services/types/poster";
import {SliderResponse} from "@/services/types/slider";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";
import {PosterStoreDto, PosterUpdateDto} from "@/services/types/poster";
import {UploadProgress, toFormData} from "@/services/http";

export const posterTable = tableFetcher<SliderResponse>("admin/poster/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: PosterStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/poster", toFormData(dto), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: PosterUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/poster/" + id, toFormData(dto, "PUT"), uploadConfig(onProgress))
        .then((res) => res?.data);
};


export const findById = async <T extends ServerResponse<PosterResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/poster/" + id)
        .then((res) => res?.data?.result?.data)
};
