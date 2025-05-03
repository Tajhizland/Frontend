import {VlogResponse} from "@/services/types/vlog";

export type  HomepageVlogResponse = {
    id: number,
    vlog_id: string;
    created_at: number;
    updated_at: string,

    vlog: VlogResponse,

}
