import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {RunConceptAnswerResponse} from "@/services/types/runConceptAnswer";
import {tableFetcher} from "@/shared/Table/fetcher";
import {RunConceptAnswerStoreDto, RunConceptAnswerUpdateDto} from "@/services/types/runConceptAnswer";

export const runConceptAnswerTable = tableFetcher<RunConceptAnswerResponse>("admin/run-concept-answer/dataTable");

export const find = async <T extends ServerResponse<RunConceptAnswerResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/run-concept-answer/" + id)
        .then((res) => res?.data?.result?.data)
};
export const getByQuestionId = async <T extends ServerResponse<RunConceptAnswerResponse[]>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/run-concept-answer/question/" + id)
        .then((res) => res?.data?.result?.data)
};

export const store = async <T extends ServerResponse<unknown>>
(dto: RunConceptAnswerStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/run-concept-answer", dto)
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: RunConceptAnswerUpdateDto) => {
    return axios.put<T, SuccessResponseType<T>>("admin/run-concept-answer/" + id, dto)
        .then((res) => res?.data)
};
