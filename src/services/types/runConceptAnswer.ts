import {Identified, Timestamps} from "@/services/http";
import {RunConceptQuestionResponse} from "@/services/types/runConceptQuestion";

export interface RunConceptAnswerBase {
    answer: string;
    status: number;
    price: number;
    run_concept_question_id: number;
}

export interface RunConceptAnswerResponse extends RunConceptAnswerBase, Identified, Timestamps {
    runConceptQuestion?: RunConceptQuestionResponse;
}

export interface RunConceptAnswerStoreDto extends RunConceptAnswerBase {}

export type RunConceptAnswerUpdateDto = RunConceptAnswerStoreDto;
