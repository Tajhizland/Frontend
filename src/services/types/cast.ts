import {VlogResponse} from "@/services/types/vlog";

export type CastResponse = {
    id: number;
    image: string;
    audio: string;
    title: string;
    description: string;
    url: string;
    status: number;
    vlog_id: number;
    vlog?: VlogResponse;
    created_at: string;
    updated_at: string;
}
