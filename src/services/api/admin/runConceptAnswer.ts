import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {RunConceptAnswerResponse} from "@/services/types/runConceptAnswer";

export const find = async <T extends ServerResponse<RunConceptAnswerResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/run-concept-answer/find/" + id)
        .then((res) => res?.data?.result?.data)
};

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        answer: string,
        status: number,
        price: number,
        run_concept_question_id: number,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/run-concept-answer/store", params)
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        answer: string,
        status: number,
        price: number,
        run_concept_question_id: number,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/run-concept-answer/update", params)
        .then((res) => res?.data)
};
