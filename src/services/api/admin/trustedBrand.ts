import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {TrustedBrandResponse} from "@/services/types/trustedBrand";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";

export const trustedBrandTable = tableFetcher<TrustedBrandResponse>("admin/trusted-brand/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        logo: File | null,
        setProgress?: (progress: number) => void,
    }
) => {
    const formData = new FormData();
    if (params.logo) formData.append('logo', params.logo);
    return axios.post<T, SuccessResponseType<T>>("admin/trusted-brand", formData, uploadConfig(params.setProgress))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        logo: File | null,
        setProgress?: (progress: number) => void,
    }
) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    if (params.logo) formData.append('logo', params.logo);

    return axios.post<T, SuccessResponseType<T>>("admin/trusted-brand/" + params.id, formData, uploadConfig(params.setProgress))
        .then((res) => res?.data);
};


export const findById = async <T extends ServerResponse<TrustedBrandResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/trusted-brand/" + id)
        .then((res) => res?.data?.result?.data)
};

export const deleteTrustedBrand = async <T extends ServerResponse<TrustedBrandResponse>>
(
    id: number | string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/trusted-brand/" + id)
        .then((res) => res?.data)
};
