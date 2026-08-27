import {Identified, Timestamps} from "@/services/http";
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
export interface VlogBase {
    title: string;
    url: string;
    description: string;
}

export interface VlogResponse extends VlogBase, Identified, Timestamps {
    hls: string;
    video: string;
    poster: string;
    author: string;
    status: number;
    categoryId: number;
    view: number;
    category: string;
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

export interface VlogStoreDto extends VlogBase {
    status: number | string;
    categoryId: number | string;
    video?: File | null;
    poster?: File | null;
}

export type VlogUpdateDto = VlogStoreDto;

/** حداقل فیلدهایی که کارت ولاگ رندر می‌کند؛ VlogResponse کامل هم با آن سازگار است. */
export type VlogCardResponse = {
    id: number;
    title: string;
    description: string;
    url: string;
    video: string;
    hls: string | null;
    poster: string;
    view: number;
    author: string;
    created_at: string;
};
