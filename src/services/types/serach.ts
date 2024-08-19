import {ProductResponse} from "@/services/types/product";
import {CategoryResponse} from "@/services/types/category";
export type SearchResponse = {
    categories:CategoryResponse[];
    products:ProductResponse[];
};
