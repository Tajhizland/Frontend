import {ConceptResponse} from "@/services/types/concept";
import {SliderResponse} from "@/services/types/slider";
import {BrandResponse} from "@/services/types/brand";
import {BannerResponse} from "@/services/types/banner";
import {PosterResponse} from "@/services/types/poster";
import {TrustedBrandResponse} from "@/services/types/trustedBrand";
import {CampaignResponse} from "@/services/types/campaign";
import {DiscountItemResponse} from "@/services/types/discountItem";
import {ProductCardResponse} from "@/services/types/product";
import {VlogCardResponse} from "@/services/types/vlog";
import {NewsCardResponse} from "@/services/types/news";

/** یک تب از بخش «دسته بندی های پرطرفدار»؛ ساختار تخت است. */
export type HomePageCategoryResponse = {
    id: number;
    name: string;
    url: string;
    image: string;
    icon: string;
    products: ProductCardResponse[];
};

export type HomePageResponse = {
    campaign: CampaignResponse | null;
    pending_campaign: CampaignResponse | null;
    discount: DiscountItemResponse | null;

    desktopSliders: SliderResponse[];
    mobileSliders: SliderResponse[];

    banners: BannerResponse[];
    banners2: BannerResponse[];
    banners3: BannerResponse[];
    banners4: BannerResponse[];
    banners5: BannerResponse[];
    bannersStock: BannerResponse[];
    bannersCast: BannerResponse[];

    topDiscountedProducts: ProductCardResponse[];
    specialProducts: ProductCardResponse[];
    homepageCategories: HomePageCategoryResponse[];

    concepts: ConceptResponse[];
    brands: BrandResponse[];
    trustedBrands: TrustedBrandResponse[];
    posters: PosterResponse[];

    vlogs: VlogCardResponse[];
    news: NewsCardResponse[];
};
