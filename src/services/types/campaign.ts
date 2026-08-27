import {CampaignSliderResponse} from "@/services/types/campaignSlider";

export type CampaignResponse = {
    id: number;
    banner: string;
    logo: string;
    color: string;
    discount_logo: string;
    background_color: string;
    title: string;
    status: number;
    start_date_fa: string;
    end_date_fa: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;

    sliders: CampaignSliderResponse[];
}

export interface CampaignStoreDto {
    title: string;
    color: string;
    logo: File;
    banner?: File;
    discount_logo: File;
    background_color: string;
    status: number;
    start_date: string;
    end_date: string;
}

export interface CampaignUpdateDto {
    title: string;
    color: string;
    logo?: File;
    banner?: File;
    discount_logo?: File;
    background_color: string;
    status: number;
    start_date: string;
    end_date: string;
}
