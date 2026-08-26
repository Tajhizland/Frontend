import {VlogResponse} from "@/services/types/vlog";
import {NewsResponse} from "@/services/types/news";
import {PosterResponse} from "@/services/types/poster";

export type LeadingResponse = {
    poster: PosterResponse;
    blog: NewsResponse[];
    vlog: VlogResponse[];
}
