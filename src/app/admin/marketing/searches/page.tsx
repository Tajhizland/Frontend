"use client";

import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import MarketingTab from "@/components/Marketing/MarketingTab";
import ReportPeriodFilter, {ReportPeriod} from "@/components/Marketing/ReportPeriodFilter";
import RankedList from "@/components/Marketing/RankedList";
import {MARKETING_COLORS, faNumber, faPercent} from "@/components/Marketing/theme";
import {searchLogTable, topSearches, zeroResultSearches} from "@/services/api/admin/marketing";
import {columns} from "@/app/admin/marketing/searches/TableRow";

const LIMIT = 30;

export default function Page() {
    const [period, setPeriod] = useState<ReportPeriod>({fromDate: "", toDate: ""});
    const params = {...period, limit: LIMIT};

    const top = useQuery({queryKey: ["marketing-top-searches", period], queryFn: () => topSearches(params)});
    const zero = useQuery({queryKey: ["marketing-zero-searches", period], queryFn: () => zeroResultSearches(params)});

    return (
        <>
            <Breadcrump breadcrumb={[{title: "مارکتینگ", href: "marketing"}, {title: "جستجوها", href: "marketing/searches"}]}/>
            <MarketingTab/>

            <ReportPeriodFilter value={period} onChange={setPeriod}/>

            <Panel>
                <PageTitle subtitle="عبارت‌های هم‌ریشه یکسان‌سازی شده‌اند و تایپ تدریجی یک جستجو حساب می‌شود">
                    بیشترین جستجوها
                </PageTitle>
                <RankedList
                    rows={top.data}
                    isLoading={top.isLoading}
                    rowKey={(row) => row.normalizedTerm}
                    title={(row) => row.term}
                    metric={(row) => row.total}
                    metricHeader="دفعات جستجو"
                    accent={MARKETING_COLORS.search}
                    columns={[
                        {header: "جستجوکننده یکتا", render: (row) => faNumber(row.visitors)},
                        {header: "میانگین نتایج", render: (row) => faNumber(row.avgResults)},
                        {header: "بدون محصول", render: (row) => faNumber(row.noProductResults)},
                        {header: "آخرین جستجو", render: (row) => row.lastSearchedAt ?? "—"},
                    ]}
                />
            </Panel>

            <Panel>
                <PageTitle subtitle="تقاضایی که فروشگاه پاسخی برایش نداشته؛ بهترین فهرست برای تصمیم خرید و تامین کالا">
                    جستجوهای بی‌نتیجه
                </PageTitle>
                <RankedList
                    rows={zero.data}
                    isLoading={zero.isLoading}
                    rowKey={(row) => row.normalizedTerm}
                    title={(row) => row.term}
                    metric={(row) => row.noProductResults}
                    metricHeader="دفعات بی‌نتیجه"
                    accent={MARKETING_COLORS.zeroResult}
                    emptyText="هیچ جستجوی بی‌نتیجه‌ای در این بازه ثبت نشده است."
                    columns={[
                        {header: "کل جستجو", render: (row) => faNumber(row.total)},
                        {header: "جستجوکننده یکتا", render: (row) => faNumber(row.visitors)},
                        {header: "سهم بی‌نتیجه", render: (row) => faPercent(row.zeroResultRate)},
                        {header: "آخرین جستجو", render: (row) => row.lastSearchedAt ?? "—"},
                    ]}
                />
            </Panel>

            <Panel>
                <PageTitle subtitle="تک‌تک جستجوهای ثبت‌شده، با امکان فیلتر و مرتب‌سازی">لاگ کامل جستجوها</PageTitle>
                <Table fetcher={searchLogTable} columns={columns} actions={[]}/>
            </Panel>
        </>
    );
}
