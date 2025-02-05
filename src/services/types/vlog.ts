import {BannerResponse} from "@/services/types/banner";

export type VlogPageResponse = {
    relatedVlogs: { data : VlogResponse[] };
    vlog:VlogResponse;
}
export type VlogListingResponse = {
    listing: { data : VlogResponse[] };
    mostViewed: { data : VlogResponse[] };
    banner: { data : BannerResponse[] };
}
export type VlogResponse = {
    id: number,
    title: string;
    url: string;
    description: string;
    video: string;
    poster: string;
    author	: string;
    status: number;
    categoryId: number;
    view: number;
    created_at: string,
    updated_at: string,
}
