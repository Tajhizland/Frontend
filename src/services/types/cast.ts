import {VlogResponse} from "@/services/types/vlog";
import {CategoryResponse} from "@/services/types/category";

export type CastResponse = {
    id: number;
    image: string;
    audio: string;
    title: string;
    description: string;
    url: string;
    status: number;
    vlog_id: number;
    category_id: number;
    vlog?: VlogResponse;
    castCategory?: CategoryResponse;
    created_at: string;
    updated_at: string;
}
