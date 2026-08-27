import {Identified, Timestamps} from "@/services/http";
export interface FaqBase {
    question: string;
    answer: string;
}

export interface FaqResponse extends FaqBase, Identified, Timestamps {
    status:number;
}

export interface FaqStoreDto extends FaqBase {
    status: number | string;
}

export type FaqUpdateDto = FaqStoreDto;
