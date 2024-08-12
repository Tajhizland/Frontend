import { ProductResponse } from "./product";

export type HomePageResponse = { 
    homepageMostPopularProducts:ProductResponse[];
    homepageHasDiscountProducts:ProductResponse[];
    homepageNewProducts:ProductResponse[];
    homepageCustomCategoryProducts:ProductResponse[];
  };