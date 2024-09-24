import {CategoryResponse} from "@/services/types/category";

export type MenuResponse = {
    id: number;
    title: string;
    parent_id: number;
    parent?: MenuResponse;
    url: string;
    banner_title: string;
    banner_link: string;
    banner_logo: string;
    created_at: string;
    updated_at: string;
}
