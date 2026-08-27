import {ProductResponse} from "@/services/types/product";
import {CategoryResponse} from "@/services/types/category";
import {LandingBannerResponse} from "@/services/types/landingBanner";

export type LandingResponse = {
    id: number;
    title: string;
    description: string;
    url: string;
    status: string;
    created_at: string;
    updated_at: string;
    product?: ProductResponse[];
    category?: CategoryResponse[];
    landingBannerImage?: LandingBannerResponse[];
    landingBannerSlider?: LandingBannerResponse[];
};

export interface LandingStoreLandingDto {
    title: string;
    description: string;
    url: string;
    status: string;
}

export interface LandingUpdateLandingDto {
    title: string;
    description: string;
    url: string;
    status: string;
}

export interface LandingSetProductLandingDto {
    landing_id: number;
    product_id: number;
}

export interface LandingSetCategoryLandingDto {
    landing_id: number;
    category_id: number;
}

export interface LandingSetLandingBannerDto {
    landing_id: number;
    slider: number;
    url: string;
    image: File;
}
