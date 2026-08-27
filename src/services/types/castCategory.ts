import {Identified, Timestamps} from "@/services/http";
export interface CastCategoryBase {
    name: string;
    status: number;
}

export interface CastCategoryResponse extends CastCategoryBase, Identified, Timestamps {}

export interface CastCategoryStoreDto extends CastCategoryBase {
    icon: File;
}

export type CastCategoryUpdateDto = CastCategoryStoreDto;
