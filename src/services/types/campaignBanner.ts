import {BaseBanner} from "@/services/types/baseBanner";

export interface CampaignBannerResponse extends BaseBanner {
    campaign_id: number;
}