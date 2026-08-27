import {CategoryResponse} from "@/services/types/category";

export type ConceptResponse = {
    id: number;
    title: string;
    description: number;
    categories?: CategoryResponse[];
    status: string;
    icon: string;
    created_at: string;
    updated_at: string;
}

export interface ConceptStoreDto {
    title: string;
    description: string;
    status: number | string;
    icon?: File | null;
}

export interface ConceptFastUpdateDto {
    title: string;
    status: number | string;
}

export interface ConceptUpdateDto {
    title: string;
    description: string;
    status: number | string;
    icon?: File | null;
}

export interface ConceptSetItemDto {
    category_id: number | string;
    concept_id: number | string;
}

export interface ConceptEditDisplayDto {
    display: string;
}
