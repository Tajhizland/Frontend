import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {RunConceptQuestionResponse} from "@/services/types/runConceptQuestion";

export const find = async <T extends ServerResponse<RunConceptQuestionResponse>>
(
    id:number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/run-concept-question/find/"+id)
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
    return axios.post<T, SuccessResponseType<T>>("admin/run-concept-question/store",params)
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
    return axios.post<T, SuccessResponseType<T>>("admin/run-concept-question/update",params)
        .then((res) => res?.data)
};
