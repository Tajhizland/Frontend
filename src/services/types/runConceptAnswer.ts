import {RunConceptQuestionResponse} from "@/services/types/runConceptQuestion";

export type RunConceptAnswerResponse = {
    id: number;
    answer: string;
    status: number;
    price: number;
    run_concept_question_id: number;
    runConceptQuestion?: RunConceptQuestionResponse;
    created_at: string;
    updated_at: string;
};
