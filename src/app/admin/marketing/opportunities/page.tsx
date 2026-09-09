"use client";

import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import MarketingTab from "@/components/Marketing/MarketingTab";
import ReportPeriodFilter, {ReportPeriod} from "@/components/Marketing/ReportPeriodFilter";
import RankedList from "@/components/Marketing/RankedList";
import {MARKETING_COLORS, faNumber, faPercent} from "@/components/Marketing/theme";
import {conversionOpportunities, unmetDemand} from "@/services/api/admin/marketing";
import {ProductEngagementResponse, ProductStatResponse} from "@/services/types/marketing";

const LIMIT = 20;

export default function Page() {
    const [period, setPeriod] = useState<ReportPeriod>({fromDate: "", toDate: ""});
    const params = {...period, limit: LIMIT};

    const conversion = useQuery({
        queryKey: ["marketing-conversion", period],
        queryFn: () => conversionOpportunities(params),
    });
    const demand = useQuery({queryKey: ["marketing-unmet-demand", period], queryFn: () => unmetDemand(params)});

    const productLink = (row: ProductEngagementResponse | ProductStatResponse) =>
        row.url ? `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/product/${row.url}` : undefined;

    return (
        <>
            <Breadcrump breadcrumb={[{title: "مارکتینگ", href: "marketing"}, {title: "فرصت‌ها", href: "marketing/opportunities"}]}/>
            <MarketingTab/>

            <ReportPeriodFilter value={period} onChange={setPeriod}/>

            <Panel>
                <PageTitle subtitle="">
                    ضعیف‌ترین نرخ تبدیل بازدید به سبد
                </PageTitle>
                <RankedList
                    rows={conversion.data}
                    isLoading={conversion.isLoading}
                    rowKey={(row) => row.productId}
                    title={(row) => row.name}
                    subtitle={(row) => `${faNumber(row.views)} بازدید در برابر ${faNumber(row.carts)} افزودن به سبد`}
                    image={(row) => row.image}
                    href={productLink}
                    metric={(row) => row.viewToCartRate}
                    metricHeader="نرخ تبدیل (٪)"
                    accent={MARKETING_COLORS.cart}
                    emptyText="هنوز محصولی با بازدید کافی برای این تحلیل ثبت نشده است."
                    columns={[
                        {header: "بازدید", render: (row) => faNumber(row.views)},
                        {header: "سبد خرید", render: (row) => faNumber(row.carts)},
                        {header: "خرید", render: (row) => faNumber(row.purchases)},
                        {header: "سبد به خرید", render: (row) => faPercent(row.cartToPurchaseRate)},
                        {header: "مقایسه", render: (row) => faNumber(row.compares)},
                    ]}
                />
            </Panel>

            <Panel>
                <PageTitle subtitle="محصولاتی که مشتری دنبالشان بوده ولی موجودی هیچ رنگی از آن‌ها باقی نمانده است">
                    تقاضای بی‌پاسخ (محصولات ناموجود پرتقاضا)
                </PageTitle>
                <RankedList
                    rows={demand.data}
                    isLoading={demand.isLoading}
                    rowKey={(row) => row.productId}
                    title={(row) => row.name}
                    image={(row) => row.image}
                    href={productLink}
                    metric={(row) => row.total}
                    metricHeader="بازدید و افزودن به سبد"
                    accent={MARKETING_COLORS.zeroResult}
                    emptyText="محصول ناموجودی با تقاضای ثبت‌شده وجود ندارد."
                    columns={[
                        {header: "بازدیدکننده یکتا", render: (row) => faNumber(row.visitors)},
                        {header: "کل بازدید محصول", render: (row) => faNumber(row.totalView)},
                    ]}
                />
            </Panel>
        </>
    );
}
