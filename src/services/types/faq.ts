export type FaqResponse = {
    id: number,
    question:string ;
    answer:string ;
    status:number ;
    created_at: string,
    updated_at: string,
}

export interface FaqStoreDto {
    question: string;
    answer: string;
    status: number | string;
}

export interface FaqUpdateDto {
    question: string;
    answer: string;
    status: number | string;
}
