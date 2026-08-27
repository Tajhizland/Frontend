import {Identified, Timestamps} from "@/services/http";
import {CampaignSliderResponse} from "@/services/types/campaignSlider";
import {CampaignBannerResponse} from "@/services/types/campaignBanner";

export interface CampaignBase {
    title: string;
    color: string;
    background_color: string;
    status: number;
    start_date: string;
    end_date: string;
}

export interface CampaignResponse extends CampaignBase, Identified, Timestamps {
    banner: string;
    logo: string;
    discount_logo: string;
    start_date_fa: string;
    end_date_fa: string;
    sliders: CampaignSliderResponse[];
    /** فقط در پاسخ صفحه اصلی (کمپین فعال) پر می‌شوند. */
    desktopSliders?: CampaignSliderResponse[];
    mobileSliders?: CampaignSliderResponse[];
    homepageBanner?: CampaignBannerResponse[];
    homepage2Banner?: CampaignBannerResponse[];
}

export interface CampaignStoreDto extends CampaignBase {
    logo: File;
    banner?: File;
    discount_logo: File;
}

export type CampaignUpdateDto = CampaignStoreDto;
