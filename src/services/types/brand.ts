import {ProductResponse} from "@/services/types/product";
import {CategoryResponse} from "@/services/types/category";
import {BannerResponse} from "@/services/types/banner";

export type BrandPageResponse = {
    brand: { data: BrandResponse[] };
    banner: { data: BannerResponse[] };
};
export type BrandResponse = {
    id: number;
    name: string;
    url: string;
    status: string;
    image: string;
    description: string;
    created_at: string;
    updated_at: string;
};

export type BrandListingResponse = {
    brand: BrandResponse;
    banner: { data: BannerResponse[] };

    products: {
        data: ProductResponse[];
        meta?: {
            total: number;
            current_page: number;
            last_page: number;
            per_page: number;
        };
    };
    categories: {
        data: CategoryResponse[];
    };
};
