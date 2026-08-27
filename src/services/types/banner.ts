import {BaseBanner} from "@/services/types/baseBanner";

export interface BannerResponse extends BaseBanner {
}

export interface BannerStoreDto {
    url: string;
    type: string;
    image?: File | undefined;
}

export interface BannerUpdateDto {
    url: string;
    type: string;
    image?: File | undefined;
}
