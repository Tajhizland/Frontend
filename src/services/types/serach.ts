import {ProductResponse} from "@/services/types/product";
import {CategoryResponse} from "@/services/types/category";
import {BrandResponse} from "@/services/types/brand";
import {VlogResponse} from "@/services/types/vlog";

export type SearchResponse = {
    categories: { data: CategoryResponse[] };
    products: { data: ProductResponse[] };
};
export type HeaderSearchResponse = {
    brands: { data: BrandResponse[] };
    vlogs: { data: VlogResponse[] };
    products: { data: ProductResponse[] };
    categories: { data: CategoryResponse[] };
};
