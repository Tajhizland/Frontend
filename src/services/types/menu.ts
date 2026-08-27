import {CategoryResponse} from "@/services/types/category";

export type MenuResponse = {
    id: number;
    title: string;
    parent_id: number;
    status: string;
    parent?: MenuResponse;
    children?: MenuResponse[];
    url: string;
    category_id: number;
    banner_link: string;
    banner_logo: string;
    created_at: string;
    updated_at: string;
}

export interface MenuStoreDto {
    title: string;
    parent_id: string;
    url: string|null;
    status: string;
    category_id: number | null;
    banner_logo: File | null;
    banner_link: string | null;
}

export interface MenuFastUpdateDto {
    title: string;
    parent_id: number;
    url: string|null;
    status: string;
}

export interface MenuUpdateDto {
    title: string;
    parent_id: string;
    url: string|null;
    status: string;
    category_id: number | null;
    banner_logo: File | null;
    banner_link: string | null;
}
