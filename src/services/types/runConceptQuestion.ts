import {Identified, Timestamps} from "@/services/http";
import {RunConceptAnswerResponse} from "@/services/types/runConceptAnswer";

export interface RunConceptQuestionBase {
    question:string;
    parent_question:number;
    parent_answer:number;
    status:number;
    level:number;
}

export interface RunConceptQuestionResponse extends RunConceptQuestionBase, Identified, Timestamps {
    parentQuestion?: RunConceptQuestionResponse;
    parentAnswer?: RunConceptAnswerResponse;
}

export interface RunConceptQuestionStoreDto extends RunConceptQuestionBase {}

export type RunConceptQuestionUpdateDto = RunConceptQuestionStoreDto;
