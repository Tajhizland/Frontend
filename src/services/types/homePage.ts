import {ConceptResponse} from "@/services/types/concept";
import {SliderResponse} from "@/services/types/slider";
import {SpecialProductResponse} from "@/services/types/specialProduct";
import {HomepageCategoryResponse} from "@/services/types/homepageCategory";
import {PopularCategoryResponse} from "@/services/types/popularCategory";
import {PopularProductResponse} from "@/services/types/popularProduct";
import {BrandResponse} from "@/services/types/brand";
import {NewsResponse} from "@/services/types/news";
import {BannerResponse} from "@/services/types/banner";
import {VlogResponse} from "@/services/types/vlog";

export type HomePageResponse = {
    popularProducts: { data: PopularProductResponse[] };
     banners: { data: BannerResponse[] };
    homepageCategories: { data: HomepageCategoryResponse[] };
    sliders: { data: SliderResponse[] };
    brands: { data: BrandResponse[] };
    news: { data: NewsResponse[] };
    vlogs: { data: VlogResponse[] };
    concepts: { data: ConceptResponse[] };
    specialProducts: { data: SpecialProductResponse[] };
};
