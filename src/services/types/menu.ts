import {CategoryResponse} from "@/services/types/category";

export type MenuResponse = {
    id: number;
    title: string;
    parent_id: number;
    status: string;
    parent?: MenuResponse;
    children?:{data:MenuResponse[]};
    url: string;
    category_id: number;
    banner_link: string;
    banner_logo: string;
    created_at: string;
    updated_at: string;
}
