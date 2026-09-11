"use client";

import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Spinner from "@/shared/Loading/Spinner";
import MarketingTab from "@/components/Marketing/MarketingTab";
import ReportPeriodFilter, {ReportPeriod} from "@/components/Marketing/ReportPeriodFilter";
import StatTile from "@/components/Marketing/StatTile";
import TrendChart from "@/components/Chart/TrendChart";
import RankedList from "@/components/Marketing/RankedList";
import {MARKETING_COLORS, faNumber, faPercent} from "@/components/Marketing/theme";
import {overview, topViewedProducts, zeroResultSearches} from "@/services/api/admin/marketing";
import {EyeIcon, MagnifyingGlassIcon, ShoppingCartIcon, ScaleIcon} from "@heroicons/react/24/outline";

export default function Page() {
    const [period, setPeriod] = useState<ReportPeriod>({fromDate: "", toDate: ""});

    const {data, isLoading} = useQuery({
        queryKey: ["marketing-overview", period],
        queryFn: () => overview(period),
    });

    const {data: topViewed, isLoading: loadingViewed} = useQuery({
        queryKey: ["marketing-overview-viewed", period],
        queryFn: () => topViewedProducts({...period, limit: 5}),
    });

    const {data: zeroResults, isLoading: loadingZero} = useQuery({
        queryKey: ["marketing-overview-zero", period],
        queryFn: () => zeroResultSearches({...period, limit: 5}),
    });

    const summary = data?.summary;
    const charts = data?.charts;

    return (
        <>
            <Breadcrump breadcrumb={[{title: "مارکتینگ", href: "marketing"}]}/>
            <MarketingTab/>

            <ReportPeriodFilter value={period} onChange={setPeriod}/>

            <Panel>
                <PageTitle subtitle="رفتار بازدیدکنندگان فروشگاه در بازه‌ی انتخاب‌شده">شاخص‌های کلیدی</PageTitle>
                {isLoading && <Spinner/>}
                {summary && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <StatTile
                            label="بازدید محصولات"
                            value={faNumber(summary.productViews)}
                            accent={MARKETING_COLORS.view}
                            icon={<EyeIcon className="w-4 h-4"/>}
                        />
                        <StatTile
                            label="افزودن به سبد خرید"
                            value={faNumber(summary.addToCart)}
                            hint={`نرخ تبدیل بازدید به سبد: ${faPercent(summary.viewToCartRate)}`}
                            accent={MARKETING_COLORS.cart}
                            icon={<ShoppingCartIcon className="w-4 h-4"/>}
                        />
                        <StatTile
                            label="جستجو"
                            value={faNumber(summary.searches)}
                            hint={`${faNumber(summary.uniqueTerms)} عبارت متفاوت`}
                            accent={MARKETING_COLORS.search}
                            icon={<MagnifyingGlassIcon className="w-4 h-4"/>}
                        />
                        <StatTile
                            label="جستجوی بدون محصول"
                            value={faNumber(summary.noProductResults)}
                            hint={`${faPercent(summary.zeroResultRate)} از جستجوها هیچ نتیجه‌ای نداشته`}
                            accent={MARKETING_COLORS.zeroResult}
                            icon={<MagnifyingGlassIcon className="w-4 h-4"/>}
                        />
                        <StatTile
                            label="مقایسه محصولات"
                            value={faNumber(summary.compare)}
                            accent={MARKETING_COLORS.view}
                            icon={<ScaleIcon className="w-4 h-4"/>}
                        />
                        <StatTile
                            label="افزودن به علاقه‌مندی"
                            value={faNumber(summary.favorite)}
                            accent={MARKETING_COLORS.cart}
                        />
                    </div>
                )}
            </Panel>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <Panel>
                    <PageTitle>روند بازدید محصولات</PageTitle>
                    {isLoading && <Spinner/>}
                    {charts && (
                        <TrendChart
                            labels={charts.productViews.map((point) => point.date)}
                            series={[{
                                label: "بازدید محصول",
                                color: MARKETING_COLORS.view,
                                data: charts.productViews.map((point) => point.value),
                            }]}
                        />
                    )}
                </Panel>

                <Panel>
                    <PageTitle>روند افزودن به سبد خرید</PageTitle>
                    {isLoading && <Spinner/>}
                    {charts && (
                        <TrendChart
                            labels={charts.addToCart.map((point) => point.date)}
                            series={[{
                                label: "افزودن به سبد",
                                color: MARKETING_COLORS.cart,
                                data: charts.addToCart.map((point) => point.value),
                            }]}
                        />
                    )}
                </Panel>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <Panel>
                    <PageTitle>۵ محصول پربازدید</PageTitle>
                    <RankedList
                        rows={topViewed}
                        isLoading={loadingViewed}
                        rowKey={(row) => row.productId}
                        title={(row) => row.name}
                        image={(row) => row.image}
                        metric={(row) => row.total}
                        metricHeader="بازدید"
                        accent={MARKETING_COLORS.view}
                    />
                </Panel>

                <Panel>
                    <PageTitle>۵ جستجوی بی‌نتیجه</PageTitle>
                    <RankedList
                        rows={zeroResults}
                        isLoading={loadingZero}
                        rowKey={(row) => row.normalizedTerm}
                        title={(row) => row.term}
                        metric={(row) => row.noProductResults}
                        metricHeader="بی‌نتیجه"
                        accent={MARKETING_COLORS.zeroResult}
                        emptyText="هیچ جستجوی بی‌نتیجه‌ای ثبت نشده است."
                    />
                </Panel>
            </div>
        </>
    );
}
