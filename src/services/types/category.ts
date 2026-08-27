import {Identified, Timestamps} from "@/services/http";
import {FilterResponse} from "@/services/types/filter";
import {ProductResponse} from "@/services/types/product";
import {CategoryConceptResponse} from "@/services/types/categoryConcept";

export interface CategoryBase {
    name: string;
    url: string;
    description: string;
    type: string;
}

export interface CategoryResponse extends CategoryBase, Identified, Timestamps {
    status: string;
    image: string;
    parent_id: number;
    minPrice: number;
    maxPrice: number;
    display_name?: string;
    filters: FilterResponse[];
    products?: ProductResponse[];
}

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

export interface CategoryStoreDto extends CategoryBase {
    image?: File | null;
    parent_id: number | string;
    status: number | string;
}

export type CategoryUpdateDto = CategoryStoreDto;

export interface CategorySearchDto {
    query: string;
}
