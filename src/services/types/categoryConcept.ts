import {CategoryResponse} from "@/services/types/category";

export type CategoryConceptResponse = {
    id: number;
    category_id: string;
    concept_id: string;
    display: string;
    category?: CategoryResponse;
    created_at: string;
    updated_at: string;
}
