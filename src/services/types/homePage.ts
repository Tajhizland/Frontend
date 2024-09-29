import {ConceptResponse} from "@/services/types/concept";
import {SliderResponse} from "@/services/types/slider";
import {SpecialProductResponse} from "@/services/types/specialProduct";
import {HomepageCategoryResponse} from "@/services/types/homepageCategory";
import {PopularCategoryResponse} from "@/services/types/popularCategory";
import {PopularProductResponse} from "@/services/types/popularProduct";
import {BrandResponse} from "@/services/types/brand";
import {NewsResponse} from "@/services/types/news";

export type HomePageResponse = {
    popularProducts: { data: PopularProductResponse[] };
    popularCategories: { data: PopularCategoryResponse[] };
    homepageCategories: { data: HomepageCategoryResponse[] };
    sliders: { data: SliderResponse[] };
    brands: { data: BrandResponse[] };
    news: { data: NewsResponse[] };
    concepts: { data: ConceptResponse[] };
    specialProducts: { data: SpecialProductResponse[] };
};
