import {ProductResponse} from "@/services/types/product";
import {CategoryResponse} from "@/services/types/category";
import {VlogResponse} from "@/services/types/vlog";

export type SearchResponse = {
    categories: { data: CategoryResponse[] };
    products: { data: ProductResponse[] };
};
export type HeaderSearchResponse = {
    vlogs: { data: VlogResponse[] };
    products: { data: ProductResponse[] };
};
