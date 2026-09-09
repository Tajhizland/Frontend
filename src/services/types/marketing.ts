export type MarketingPeriod = {
    fromDate?: string;
    toDate?: string;
    limit?: number;
};

export type MarketingSeriesPoint = {
    date: string;
    value: number;
    visitors?: number;
    zeroResults?: number;
};

export type MarketingOverviewResponse = {
    summary: {
        productViews: number;
        viewVisitors: number;
        addToCart: number;
        compare: number;
        favorite: number;
        searches: number;
        uniqueTerms: number;
        zeroResults: number;
        noProductResults: number;
        zeroResultRate: number;
        viewToCartRate: number;
    };
    charts: {
        productViews: MarketingSeriesPoint[];
        addToCart: MarketingSeriesPoint[];
        compare: MarketingSeriesPoint[];
        searches: MarketingSeriesPoint[];
    };
};

export type ProductStatResponse = {
    productId: number;
    name: string;
    url: string | null;
    image: string | null;
    totalView: number;
    total: number;
    visitors: number;
    lastEventAt: string | null;
};

export type CategoryStatResponse = {
    categoryId: number;
    name: string;
    url: string | null;
    total: number;
    visitors: number;
    lastEventAt: string | null;
};

export type ProductEngagementResponse = {
    productId: number;
    name: string;
    url: string | null;
    image: string | null;
    views: number;
    carts: number;
    compares: number;
    favorites: number;
    purchases: number;
    viewToCartRate: number;
    cartToPurchaseRate: number;
};

export type SearchTermResponse = {
    term: string;
    normalizedTerm: string;
    total: number;
    visitors: number;
    avgResults: number;
    zeroResults: number;
    noProductResults: number;
    zeroResultRate: number;
    lastSearchedAt: string | null;
};

export type SearchLogResponse = {
    id: number;
    term: string;
    result_count: number;
    product_count: number;
    ip: string | null;
    source: string;
    user?: { id: number; name: string; username: string };
    created_at: string;
};

/** رویدادهایی که فرانت اجازه ثبتشان را دارد؛ باید با MarketingEventType::clientTrackable هماهنگ بماند. */
export type TrackableMarketingEvent = "product_view" | "add_to_cart" | "remove_from_cart" | "compare";

export type MarketingEventDto = {
    type: TrackableMarketingEvent;
    product_id?: number | null;
    category_id?: number | null;
    quantity?: number;
    meta?: Record<string, unknown>;
};
