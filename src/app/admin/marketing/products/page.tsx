"use client";

import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import MarketingTab from "@/components/Marketing/MarketingTab";
import ReportPeriodFilter, {ReportPeriod} from "@/components/Marketing/ReportPeriodFilter";
import RankedList from "@/components/Marketing/RankedList";
import {MARKETING_COLORS, faNumber} from "@/components/Marketing/theme";
import {
    topCartProducts,
    topCategories,
    topComparedProducts,
    topFavoriteProducts,
    topViewedProducts,
} from "@/services/api/admin/marketing";
import {ProductStatResponse} from "@/services/types/marketing";

const LIMIT = 20;

/** ستون‌های مشترک گزارش‌های محصولی؛ هر جدول همین‌ها را کنار میله‌ی مقایسه نشان می‌دهد. */
const productColumns = [
    {header: "بازدیدکننده یکتا", render: (row: ProductStatResponse) => faNumber(row.visitors)},
    {header: "آخرین رویداد", render: (row: ProductStatResponse) => row.lastEventAt ?? "—"},
];

export default function Page() {
    const [period, setPeriod] = useState<ReportPeriod>({fromDate: "", toDate: ""});
    const params = {...period, limit: LIMIT};

    const viewed = useQuery({queryKey: ["marketing-viewed", period], queryFn: () => topViewedProducts(params)});
    const cart = useQuery({queryKey: ["marketing-cart", period], queryFn: () => topCartProducts(params)});
    const compared = useQuery({queryKey: ["marketing-compared", period], queryFn: () => topComparedProducts(params)});
    const favorite = useQuery({queryKey: ["marketing-favorite", period], queryFn: () => topFavoriteProducts(params)});
    const categories = useQuery({queryKey: ["marketing-categories", period], queryFn: () => topCategories(params)});

    const productLink = (row: ProductStatResponse) =>
        row.url ? `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/product/${row.url}` : undefined;

    return (
        <>
            <Breadcrump breadcrumb={[{title: "مارکتینگ", href: "marketing"}, {title: "محصولات", href: "marketing/products"}]}/>
            <MarketingTab/>

            <ReportPeriodFilter value={period} onChange={setPeriod}/>

            <Panel>
                <PageTitle subtitle="بر اساس بازدید صفحه‌ی محصول در بازه‌ی انتخاب‌شده">پربازدیدترین محصولات</PageTitle>
                <RankedList
                    rows={viewed.data}
                    isLoading={viewed.isLoading}
                    rowKey={(row) => row.productId}
                    title={(row) => row.name}
                    subtitle={(row) => `کل بازدید محصول: ${faNumber(row.totalView)}`}
                    image={(row) => row.image}
                    href={productLink}
                    metric={(row) => row.total}
                    metricHeader="بازدید در بازه"
                    accent={MARKETING_COLORS.view}
                    columns={productColumns}
                />
            </Panel>

            <Panel>
                <PageTitle subtitle="محصولاتی که بیشترین بار به سبد خرید اضافه شده‌اند">
                    بیشترین افزوده‌شدن به سبد خرید
                </PageTitle>
                <RankedList
                    rows={cart.data}
                    isLoading={cart.isLoading}
                    rowKey={(row) => row.productId}
                    title={(row) => row.name}
                    image={(row) => row.image}
                    href={productLink}
                    metric={(row) => row.total}
                    metricHeader="افزودن به سبد"
                    accent={MARKETING_COLORS.cart}
                    columns={productColumns}
                />
            </Panel>

            <Panel>
                <PageTitle subtitle="محصولاتی که کاربران بیشتر آن‌ها را با هم مقایسه کرده‌اند">
                    بیشترین محصولات مقایسه‌شده
                </PageTitle>
                <RankedList
                    rows={compared.data}
                    isLoading={compared.isLoading}
                    rowKey={(row) => row.productId}
                    title={(row) => row.name}
                    image={(row) => row.image}
                    href={productLink}
                    metric={(row) => row.total}
                    metricHeader="دفعات مقایسه"
                    accent={MARKETING_COLORS.zeroResult}
                    columns={productColumns}
                />
            </Panel>

            <Panel>
                <PageTitle subtitle="">
                    بیشترین افزودن به علاقه‌مندی
                </PageTitle>
                <RankedList
                    rows={favorite.data}
                    isLoading={favorite.isLoading}
                    rowKey={(row) => row.productId}
                    title={(row) => row.name}
                    image={(row) => row.image}
                    href={productLink}
                    metric={(row) => row.total}
                    metricHeader="علاقه‌مندی"
                    accent={MARKETING_COLORS.search}
                    columns={productColumns}
                />
            </Panel>

            <Panel>
                <PageTitle subtitle="بر اساس دسته‌ی محصولی که بازدید شده است">پربازدیدترین دسته‌بندی‌ها</PageTitle>
                <RankedList
                    rows={categories.data}
                    isLoading={categories.isLoading}
                    rowKey={(row) => row.categoryId}
                    title={(row) => row.name}
                    metric={(row) => row.total}
                    metricHeader="بازدید"
                    accent={MARKETING_COLORS.view}
                    columns={[
                        {header: "بازدیدکننده یکتا", render: (row) => faNumber(row.visitors)},
                        {header: "آخرین رویداد", render: (row) => row.lastEventAt ?? "—"},
                    ]}
                />
            </Panel>
        </>
    );
}
