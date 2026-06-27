import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PosterResponse} from "@/services/types/poster";
import {SliderResponse} from "@/services/types/slider";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";

export const posterTable = tableFetcher<SliderResponse>("admin/poster/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        image: File ,
        setProgress?: (progress: number) => void,
    }
) => {
    const formData = new FormData();
    formData.append('image', params.image);
    return axios.post<T, SuccessResponseType<T>>("admin/poster/store", formData, uploadConfig(params.setProgress))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        image: File ,
        setProgress?: (progress: number) => void,
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('image', params.image);

    return axios.post<T, SuccessResponseType<T>>("admin/poster/update", formData, uploadConfig(params.setProgress))
        .then((res) => res?.data);
};


export const findById = async <T extends ServerResponse<PosterResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/poster/find/" + id)
        .then((res) => res?.data?.result?.data)
};
