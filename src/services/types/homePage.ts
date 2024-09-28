import {ConceptResponse} from "@/services/types/concept";
import {SliderResponse} from "@/services/types/slider";
import {SpecialProductResponse} from "@/services/types/specialProduct";
import {HomepageCategoryResponse} from "@/services/types/homepageCategory";
import {PopularCategoryResponse} from "@/services/types/popularCategory";
import {PopularProductResponse} from "@/services/types/popularProduct";

export type HomePageResponse = {
    popularProducts:PopularProductResponse[];
    popularCategories:PopularCategoryResponse[];
    homepageCategories:HomepageCategoryResponse[];
    sliders:SliderResponse[];
    concepts:ConceptResponse[];
    specialProducts:SpecialProductResponse[];
  };
