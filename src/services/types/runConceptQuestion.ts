import {RunConceptAnswerResponse} from "@/services/types/runConceptAnswer";

export type RunConceptQuestionResponse = {
    id: number;
    question: string;
    status: number;
    level: number;
    parent_question: number;
    parent_answer: number;
    parentQuestion?: RunConceptQuestionResponse;
    parentAnswer?: RunConceptAnswerResponse;
    created_at: string;
    updated_at: string;
};

export interface RunConceptQuestionStoreDto {
    question:string;
    parent_question:number;
    parent_answer:number;
    status:number;
    level:number;
}

export interface RunConceptQuestionUpdateDto {
    question:string;
    parent_question:number;
    parent_answer:number;
    status:number;
    level:number;
}
