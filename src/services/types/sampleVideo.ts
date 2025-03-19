import {VlogResponse} from "@/services/types/vlog";

export interface SampleVideoResponse {
    id: number;
    sort: number;
    created_at: string;
    updated_at: string;
    vlog_id: number;
    vlog?: VlogResponse;
}
