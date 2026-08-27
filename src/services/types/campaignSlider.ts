import {BaseSlider} from "@/services/types/baseSlider";

export interface CampaignSliderResponse extends BaseSlider {
    campaign_id: number;
}

export interface CampaignSliderStoreDto {
    campaign_id: number;
    title: string;
    url: string;
    type: string;
    status: number | string;
    image: File;
}

export interface CampaignSliderUpdateDto {
    title: string;
    url: string;
    type: string;
    status: number | string;
    image: File | undefined;
}
