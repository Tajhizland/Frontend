import {Identified, Timestamps} from "@/services/http";
import {ProductResponse} from "@/services/types/product";
import {CategoryResponse} from "@/services/types/category";
import {BannerResponse} from "@/services/types/banner";

export type BrandPageResponse = {
    brand: { data: BrandResponse[] };
    banner: { data: BannerResponse[] };
};
export interface BrandBase {
    name: string;
    url: string;
    description: string;
}

export interface BrandResponse extends BrandBase, Identified, Timestamps {
    status: string;
    image: string;
    banner: string;
}

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

export interface BrandStoreDto extends BrandBase {
    status: number | string;
    image?: File | null;
    banner?: File | null;
}

export type BrandUpdateDto = BrandStoreDto;
