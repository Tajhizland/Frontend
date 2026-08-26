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
