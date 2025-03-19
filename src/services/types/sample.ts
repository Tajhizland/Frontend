import {SampleImageResponse} from "@/services/types/sampleImage";
import {SampleVideoResponse} from "@/services/types/sampleVideo";

export interface SamplePageResponse {
    info: SampleResponse;
    image: { data: SampleImageResponse[] };
    video: { data: SampleVideoResponse[] };
}

export interface SampleResponse {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
}
