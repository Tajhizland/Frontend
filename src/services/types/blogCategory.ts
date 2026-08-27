import {Identified, Timestamps} from "@/services/http";
import {CityResponse} from "@/services/types/city";
import {ProviceResponse} from "@/services/types/province";

export interface BlogCategoryBase {
    name: string;
    url: string;
    status: number;
}

export interface BlogCategoryResponse extends BlogCategoryBase, Identified, Timestamps {}

export interface BlogCategoryStoreDto extends BlogCategoryBase {}

export type BlogCategoryUpdateDto = BlogCategoryStoreDto;
