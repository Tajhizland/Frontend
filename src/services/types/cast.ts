import {Identified, Timestamps} from "@/services/http";
import {VlogResponse} from "@/services/types/vlog";
import {CategoryResponse} from "@/services/types/category";
import {CastCategoryResponse} from "@/services/types/castCategory";
import {BannerResponse} from "@/services/types/banner";

export type CastListingResponse = {
    listing: { data: CastResponse[] };
    mostViewed: { data: CastResponse[] };
    category: { data: CastCategoryResponse[] };
    banner: { data: BannerResponse[] };

}
export interface CastBase {
    title: string;
    url: string;
    vlog_id: number;
    category_id: number;
    status: number;
    description: string;
}

export interface CastResponse extends CastBase, Identified, Timestamps {
    image: string;
    audio: string;
    vlog?: VlogResponse;
    castCategory?: CategoryResponse;
}

export interface CastStoreDto extends CastBase {
    audio: File;
    image: File;
}

export type CastUpdateDto = CastStoreDto;
