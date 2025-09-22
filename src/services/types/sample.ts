import {SampleImageResponse} from "@/services/types/sampleImage";
import {SampleVideoResponse} from "@/services/types/sampleVideo";
import {PosterResponse} from "@/services/types/poster";

export interface SamplePageResponse {
    info: SampleResponse;
    poster: PosterResponse;
    image: { data: SampleImageResponse[] };
    video: { data: SampleVideoResponse[] };
}

export interface SampleResponse {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
}
