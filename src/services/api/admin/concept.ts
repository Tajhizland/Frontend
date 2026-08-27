import axios, { ServerResponse, SuccessResponseType } from "@/services/axios";
import { ConceptResponse } from "@/services/types/concept";
import { CategoryConceptResponse } from "@/services/types/categoryConcept";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";
import {ConceptEditDisplayDto, ConceptFastUpdateDto, ConceptSetItemDto, ConceptStoreDto, ConceptUpdateDto} from "@/services/types/concept";
import {UploadProgress, toFormData} from "@/services/http";

export const conceptTable = tableFetcher<ConceptResponse>("admin/concept/dataTable");


export const store = async <T extends ServerResponse<unknown>>(dto: ConceptStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/concept", toFormData(dto), uploadConfig(onProgress))
        .then((res) => res?.data);
};


export const fastUpdate = async <T extends ServerResponse<unknown>>
    (id: number, dto: ConceptFastUpdateDto) => {

    return axios.put<T, SuccessResponseType<T>>("admin/concept/" + id, dto)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
    (id: number, dto: ConceptUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/concept/" + id, toFormData(dto, "PUT"), uploadConfig(onProgress))
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
    (dto: ConceptSetItemDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/concept/item", dto)
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
    (id: number, dto: ConceptEditDisplayDto) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/concept/item/" + id + "/display", {display: dto.display})
        .then((res) => res?.data)
};
