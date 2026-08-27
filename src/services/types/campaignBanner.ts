import {BaseBanner} from "@/services/types/baseBanner";

export interface CampaignBannerResponse extends BaseBanner {
    campaign_id: number;
}

export interface CampaignBannerStoreDto {
    campaign_id: number;
    url: string;
    type: string;
    image: File;
}

export interface CampaignBannerUpdateDto {
    url: string;
    type: string;
    image?: File | undefined;
}
