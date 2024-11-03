import {FilterResponse} from "@/services/types/filter";
import {ProductResponse} from "@/services/types/product";
import {CategoryConceptResponse} from "@/services/types/categoryConcept";

export type CategoryResponse = {
    id: number;
    name: string;
    status: string;
    url: string;
    image: string;
    parent_id: number;
    description: string;
    created_at: string;
    updated_at: string;
    minPrice: number;
    maxPrice: number;
    display_name?: string;
    filters: { data: FilterResponse[] };
    products?: { data: ProductResponse[] };
};

export type CategoryListing = {
    category: CategoryResponse;
    products: {
        data: ProductResponse[];
        meta?: {
            total: number;
            current_page: number;
            last_page: number;
            per_page: number;
        };
    };

};
