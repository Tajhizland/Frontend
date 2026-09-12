"use client";

import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Spinner from "@/shared/Loading/Spinner";
import MarketingTab from "@/components/Marketing/MarketingTab";
import ReportPeriodFilter, {ReportPeriod} from "@/components/Marketing/ReportPeriodFilter";
import StackedShareBar from "@/components/Marketing/StackedShareBar";
import StatTile from "@/components/Marketing/StatTile";
import RankedList from "@/components/Marketing/RankedList";
import TrendChart from "@/components/Chart/TrendChart";
import {DEVICE_COLORS, deviceColor, faNumber, faPercent} from "@/components/Marketing/theme";
import {deviceReport} from "@/services/api/admin/marketing";
import {DeviceShareResponse} from "@/services/types/marketing";
import {DevicePhoneMobileIcon, ComputerDesktopIcon} from "@heroicons/react/24/outline";

export default function Page() {
    const [period, setPeriod] = useState<ReportPeriod>({fromDate: "", toDate: ""});

    const {data, isLoading} = useQuery({
        queryKey: ["marketing-devices", period],
        queryFn: () => deviceReport({...period, limit: 15}),
    });

    // ربات‌ها از نوار سهم بیرون می‌مانند؛ عددشان جداگانه در کاشی‌ها نشان داده می‌شود.
    const segments = (data?.share ?? [])
        .filter((row: DeviceShareResponse) => row.share !== null)
        .map((row: DeviceShareResponse) => ({
            key: row.device,
            label: row.label,
            value: row.total,
            share: row.share ?? 0,
            color: deviceColor(row.device),
        }));

    const find = (device: string) => data?.share?.find((row) => row.device === device);
    const mobile = find("mobile");
    const desktop = find("desktop");
    const bot = find("bot");

    return (
        <>
            <Breadcrump breadcrumb={[{title: "مارکتینگ", href: "marketing"}, {title: "دستگاه‌ها", href: "marketing/devices"}]}/>
            <MarketingTab/>

            <ReportPeriodFilter value={period} onChange={setPeriod}/>

            <Panel>
                <PageTitle subtitle="بر اساس بازدید صفحات سایت در بازه‌ی انتخاب‌شده">
                    کاربران با چه دستگاهی وارد می‌شوند؟
                </PageTitle>
                {isLoading && <Spinner/>}
                {data && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <StatTile
                                label="سهم موبایل"
                                value={faPercent(mobile?.share ?? 0)}
                                hint={`${faNumber(mobile?.total ?? 0)} بازدید`}
                                accent={DEVICE_COLORS.mobile}
                                icon={<DevicePhoneMobileIcon className="w-4 h-4"/>}
                            />
                            <StatTile
                                label="سهم دسکتاپ"
                                value={faPercent(desktop?.share ?? 0)}
                                hint={`${faNumber(desktop?.total ?? 0)} بازدید`}
                                accent={DEVICE_COLORS.desktop}
                                icon={<ComputerDesktopIcon className="w-4 h-4"/>}
                            />
                            <StatTile
                                label="کل بازدید کاربران"
                                value={faNumber(data.humanTotal)}
                                hint="بدون احتساب ربات‌ها"
                            />
                            <StatTile
                                label="بازدید ربات‌ها"
                                value={faNumber(bot?.total ?? 0)}
                                hint="خزنده‌های موتور جستجو و پیام‌رسان‌ها"
                                accent={DEVICE_COLORS.bot}
                            />
                        </div>

                        <StackedShareBar segments={segments}/>
                    </>
                )}
            </Panel>

            <Panel>
                <PageTitle subtitle="اگر دو خط به هم نزدیک شوند یعنی ترکیب مخاطب در حال تغییر است">
                    روند موبایل در برابر دسکتاپ
                </PageTitle>
                {isLoading && <Spinner/>}
                {data && (
                    <TrendChart
                        labels={data.trend.map((point) => point.date)}
                        yLabel="بازدید"
                        series={[
                            {label: "موبایل", color: DEVICE_COLORS.mobile, data: data.trend.map((p) => p.mobile)},
                            {label: "دسکتاپ", color: DEVICE_COLORS.desktop, data: data.trend.map((p) => p.desktop)},
                            {label: "تبلت", color: DEVICE_COLORS.tablet, data: data.trend.map((p) => p.tablet)},
                        ]}
                    />
                )}
            </Panel>

            <Panel>
                <PageTitle subtitle="اگر سهم بازدید موبایل بالا ولی نرخ تبدیلش پایین باشد، مشکل از تجربه‌ی موبایل است نه از ترافیک">
                    نرخ تبدیل به تفکیک دستگاه
                </PageTitle>
                <RankedList
                    rows={data?.conversion}
                    isLoading={isLoading}
                    rowKey={(row) => row.device}
                    title={(row) => row.label}
                    metric={(row) => row.views}
                    metricHeader="بازدید محصول"
                    accent={DEVICE_COLORS.mobile}
                    emptyText="هنوز رویداد محصولی با تفکیک دستگاه ثبت نشده است."
                    columns={[
                        {header: "سبد خرید", render: (row) => faNumber(row.carts)},
                        {header: "خرید", render: (row) => faNumber(row.purchases)},
                        {header: "بازدید به سبد", render: (row) => faPercent(row.viewToCartRate)},
                        {header: "سبد به خرید", render: (row) => faPercent(row.cartToPurchaseRate)},
                    ]}
                />
            </Panel>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <Panel>
                    <PageTitle>سیستم‌عامل</PageTitle>
                    <RankedList
                        rows={data?.platforms}
                        isLoading={isLoading}
                        rowKey={(row) => row.name}
                        title={(row) => row.name}
                        metric={(row) => row.total}
                        metricHeader="بازدید"
                        accent={DEVICE_COLORS.mobile}
                        columns={[{header: "بازدیدکننده یکتا", render: (row) => faNumber(row.visitors)}]}
                    />
                </Panel>

                <Panel>
                    <PageTitle>مرورگر</PageTitle>
                    <RankedList
                        rows={data?.browsers}
                        isLoading={isLoading}
                        rowKey={(row) => row.name}
                        title={(row) => row.name}
                        metric={(row) => row.total}
                        metricHeader="بازدید"
                        accent={DEVICE_COLORS.desktop}
                        columns={[{header: "بازدیدکننده یکتا", render: (row) => faNumber(row.visitors)}]}
                    />
                </Panel>
            </div>
        </>
    );
}
