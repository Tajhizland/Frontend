import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {RunConceptQuestionResponse} from "@/services/types/runConceptQuestion";
import {tableFetcher} from "@/shared/Table/fetcher";
import {RunConceptQuestionStoreDto, RunConceptQuestionUpdateDto} from "@/services/types/runConceptQuestion";

export const runConceptQuestionTable = tableFetcher<RunConceptQuestionResponse>("admin/run-concept-question/dataTable");

export const find = async <T extends ServerResponse<RunConceptQuestionResponse>>
(
    id:number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/run-concept-question/"+id)
        .then((res) => res?.data?.result?.data)
};

export const list = async <T extends ServerResponse<RunConceptQuestionResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/run-concept-question/list")
        .then((res) => res?.data?.result?.data)
};

export const store = async <T extends ServerResponse<unknown>>
(dto: RunConceptQuestionStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/run-concept-question",dto)
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: RunConceptQuestionUpdateDto) => {
    return axios.put<T, SuccessResponseType<T>>("admin/run-concept-question/"+id,dto)
        .then((res) => res?.data)
};
