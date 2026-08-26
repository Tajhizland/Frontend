import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {RunConceptQuestionResponse} from "@/services/types/runConceptQuestion";
import {tableFetcher} from "@/shared/Table/fetcher";

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
(
    params:{
        question:string ,
        parent_question:number ,
        parent_answer:number ,
        status:number ,
        level:number ,

    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/run-concept-question",params)
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(
    params:{
        id:number ,
        question:string ,
        parent_question:number ,
        parent_answer:number ,
        status:number ,
        level:number ,

    }
) => {
    return axios.put<T, SuccessResponseType<T>>("admin/run-concept-question/"+params.id,params)
        .then((res) => res?.data)
};
