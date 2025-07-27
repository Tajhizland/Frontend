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
    type: string;
    created_at: string;
    updated_at: string;
    minPrice: number;
    maxPrice: number;
    display_name?: string;
    filters: { data: FilterResponse[] };
    products?: { data: ProductResponse[] };
};

export type breadcrumbResponse = {
    id: number;
    name: string;
    url: string;
};

export type CategoryListing = {
    category: CategoryResponse;
    children: { data: CategoryResponse };
    groups: { data: ProductResponse[] };
    breadcrumb: { data: breadcrumbResponse[] };
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

