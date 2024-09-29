import {CategoryResponse} from "@/services/types/category";

export type ConceptResponse = {
    id: number;
    title: string;
    description: number;
    categories?: { data: CategoryResponse[] };
    status: string;
    image: string;
    created_at: string;
    updated_at: string;
}
