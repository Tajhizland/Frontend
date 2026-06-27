import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BrandResponse} from "@/services/types/brand";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";

export const brandTable = tableFetcher<BrandResponse>("admin/brand/dataTable");

export const brandList = async <T extends ServerResponse<BrandResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/brand/list")
        .then((res) => res?.data?.result)
};
export const store = async <T extends ServerResponse<unknown>>(
    params: {
        name: string,
        url: string,
        status: number | string,
        image: File | null,
        banner: File | null,
        description: string,
        setProgress?: (progress: number) => void,
    }
) => {
    const formData = new FormData();
    formData.append('name', params.name);
    formData.append('url', params.url);
    formData.append('status', params.status.toString());
    formData.append('description', params.description);

    if (params.image) {
        formData.append('image', params.image);
    }
    if (params.banner) {
        formData.append('banner', params.banner);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/brand/store", formData, uploadConfig(params.setProgress))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string,
        name: string,
        url: string,
        status: number | string,
        image: File | null,
        banner: File | null,
        description: string,
        setProgress?: (progress: number) => void,
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('name', params.name);
    formData.append('url', params.url);
    formData.append('status', params.status.toString());
    formData.append('description', params.description);

    if (params.image) {
        formData.append('image', params.image);
    }
    if (params.banner) {
        formData.append('banner', params.banner);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/brand/update", formData, uploadConfig(params.setProgress))
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<BrandResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/brand/find/" + id)
        .then((res) => res?.data?.result?.data)
};
export const sortBrands = async <T extends ServerResponse<unknown>>
(
    param:{
        brand: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/brand/sort",param)
        .then((res) => res?.data)
};
