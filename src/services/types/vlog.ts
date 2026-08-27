import {BannerResponse} from "@/services/types/banner";
import {VlogCategoryResponse} from "@/services/types/vlogCategory";

export type VlogPageResponse = {
    relatedVlogs: { data: VlogResponse[] };
    vlog: VlogResponse;
}
export type VlogListingResponse = {
    listing: { data: VlogResponse[] };
    mostViewed: { data: VlogResponse[] };
    banner: { data: BannerResponse[] };
    categorys?: { data: VlogCategoryResponse[] }
}
export type VlogResponse = {
    id: number,
    title: string;
    url: string;
    description: string;
    hls: string;
    video: string;
    poster: string;
    author: string;
    status: number;
    categoryId: number;
    view: number;
    category: string;
    created_at: string,
    updated_at: string,
}

export interface VlogStoreDirectDto {
    title: string;
    url: string;
    status: number | string;
    categoryId: number | string;
    videoKey: string;
    poster: File;
    description: string;
}

export interface VlogStoreDto {
    title: string;
    url: string;
    status: number | string;
    categoryId: number | string;
    video: File | null;
    poster: File | null;
    description: string;
}

export interface VlogUpdateDto {
    title: string;
    url: string;
    status: number | string;
    categoryId: number | string;
    video: File | null;
    poster: File | null;
    description: string;
}
