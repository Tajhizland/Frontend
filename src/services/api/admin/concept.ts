import axios, { ServerResponse, SuccessResponseType } from "@/services/axios";
import { ConceptResponse } from "@/services/types/concept";
import { CategoryConceptResponse } from "@/services/types/categoryConcept";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";

export const conceptTable = tableFetcher<ConceptResponse>("admin/concept/dataTable");


export const store = async <T extends ServerResponse<unknown>>(
    params: {
        title: string,
        description: string,
        status: number | string,
        icon: File | null,
        setProgress?: (progress: number) => void,
    }
) => {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('status', params.status.toString());
    formData.append('description', params.description);

    if (params.icon) {
        formData.append('icon', params.icon);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/concept", formData, uploadConfig(params.setProgress))
        .then((res) => res?.data);
};


export const fastUpdate = async <T extends ServerResponse<unknown>>
    (
        params: {
            id: number | string,
            title: string,
            status: number | string,
        }
    ) => {

    return axios.put<T, SuccessResponseType<T>>("admin/concept/" + params.id, params)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
    (
        params: {
            id: number | string,
            title: string,
            description: string,
            status: number | string,
            icon: File | null,
            setProgress?: (progress: number) => void,
        }
    ) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('title', params.title);
    formData.append('status', params.status.toString());
    formData.append('description', params.description);

    if (params.icon) {
        formData.append('icon', params.icon);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/concept/" + params.id, formData, uploadConfig(params.setProgress))
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<ConceptResponse>>
    (
        id: number | string
    ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/concept/" + id)
        .then((res) => res?.data?.result?.data)
};
export const getItems = async <T extends ServerResponse<CategoryConceptResponse[]>>
    (
        id: number | string
    ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/concept/" + id + "/item")
        .then((res) => res?.data?.result?.data)
};

export const setItem = async <T extends ServerResponse<unknown>>
    (
        params: {
            category_id: number | string,
            concept_id: number | string,
        }
    ) => {
    return axios.post<T, SuccessResponseType<T>>("admin/concept/item", params)
        .then((res) => res?.data)
};

export const deleteItem = async <T extends ServerResponse<unknown>>
    (
        id: number | string
    ) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/concept/item/" + id)
        .then((res) => res?.data)
};

export const editDisplay = async <T extends ServerResponse<unknown>>
    (
        params: {
            id: number | string,
            display: string
        }
    ) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/concept/item/" + params.id + "/display", {display: params.display})
        .then((res) => res?.data)
};
