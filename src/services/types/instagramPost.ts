import {Identified, Paginated, Timestamps} from "@/services/http";

export type InstagramMediaType = "image" | "video";

export type InstagramPostMediaResponse = {
    id: number;
    postId: number;
    type: InstagramMediaType;
    file: string;
    sort: number | null;
};

export interface InstagramPostResponse extends Identified, Timestamps {
    caption: string | null;
    url: string;
    status: number;
    view: number;
    sort: number | null;
    /** در جدول ادمین فقط شمارش می‌آید و media خالی است */
    mediaCount?: number;
    media?: InstagramPostMediaResponse[];
    /** unix timestamp؛ مبنای نمایش زمان نسبی در فید */
    timestamp: number | null;
}

export type InstagramPostListingResponse = {
    listing: Paginated<InstagramPostResponse>;
};

export type InstagramPostPageResponse = {
    post: InstagramPostResponse;
};

export interface InstagramPostStoreDto {
    caption?: string | null;
    url: string;
    status: number | string;
    media: File[];
}

export interface InstagramPostUpdateDto {
    caption?: string | null;
    url: string;
    status: number | string;
}

export interface InstagramPostAddMediaDto {
    postId: number;
    media: File[];
}
