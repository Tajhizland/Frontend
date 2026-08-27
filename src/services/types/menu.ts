import {Identified, Timestamps} from "@/services/http";
import {CategoryResponse} from "@/services/types/category";

export interface MenuBase {
    title: string;
    status: string;
}

export interface MenuResponse extends MenuBase, Identified, Timestamps {
    parent_id: number;
    parent?: MenuResponse;
    children?: MenuResponse[];
    url: string;
    category_id: number;
    banner_link: string;
    banner_logo: string;
}

export interface MenuStoreDto extends MenuBase {
    parent_id: string;
    url: string|null;
    category_id: number | null;
    banner_logo?: File | null;
    banner_link: string | null;
}

export interface MenuFastUpdateDto {
    title: string;
    parent_id: number;
    url: string|null;
    status: string;
}

export type MenuUpdateDto = MenuStoreDto;
