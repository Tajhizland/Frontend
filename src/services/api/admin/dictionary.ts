import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {DictionaryResponse} from "@/services/types/dictionary";
import {tableFetcher} from "@/shared/Table/fetcher";
import {DictionaryStoreDto, DictionaryUpdateDto} from "@/services/types/dictionary";

export const dictionaryTable = tableFetcher<DictionaryResponse>("admin/dictionary/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: DictionaryStoreDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/dictionary", dto)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: DictionaryUpdateDto) => {

    return axios.put<T, SuccessResponseType<T>>("admin/dictionary/" + id, dto)
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<DictionaryResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/dictionary/" + id)
        .then((res) => res?.data?.result?.data)
};
export const removeById = async <T extends ServerResponse<DictionaryResponse>>
(
    id: number | string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/dictionary/" + id)
        .then((res) => res?.data)
};
