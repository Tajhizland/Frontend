"use client";

import {Line} from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    ChartData,
    ChartOptions,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import {fade} from "@/components/Marketing/theme";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

export type TrendSeries = {
    label: string;
    color: string;
    data: number[];
};

type Props = {
    labels: string[];
    series: TrendSeries[];
    yLabel?: string;
};

/**
 * نمودار روند برای گزارش‌های مارکتینگ.
 *
 * همه‌ی سری‌های یک نمودار باید هم‌واحد باشند (اینجا «تعداد»)؛ محور دوم عمداً وجود ندارد
 * چون مقایسه‌ی دو مقیاس روی یک نمودار همیشه گمراه‌کننده است. لِجند از دو سری به بالا
 * نمایش داده می‌شود و برای تک‌سری عنوان پنل خودش نقش برچسب را دارد.
 */
export default function TrendChart({labels, series, yLabel = "تعداد"}: Props) {
    const data: ChartData<"line"> = {
        labels,
        datasets: series.map((item) => ({
            label: item.label,
            data: item.data,
            borderColor: item.color,
            backgroundColor: fade(item.color),
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointHoverBackgroundColor: item.color,
            pointHoverBorderColor: "#ffffff",
            tension: 0.25,
            fill: series.length === 1,
        })),
    };

    const options: ChartOptions<"line"> = {
        maintainAspectRatio: false,
        // تولتیپ روی کل ستون تاریخ فعال می‌شود تا لازم نباشد کاربر دقیقا روی نقطه بایستد.
        interaction: {mode: "index", intersect: false},
        scales: {
            x: {
                type: "category",
                grid: {display: false},
                border: {color: "#e2e8f0"},
                ticks: {
                    color: "#94a3b8",
                    maxRotation: 0,
                    autoSkipPadding: 24,
                    font: {family: "IS_Medium", size: 11},
                },
            },
            y: {
                beginAtZero: true,
                grid: {color: "#f1f5f9"},
                border: {display: false},
                title: {
                    display: true,
                    text: yLabel,
                    color: "#94a3b8",
                    font: {family: "IS_Medium", size: 12},
                },
                ticks: {
                    color: "#94a3b8",
                    precision: 0,
                    font: {family: "IS_Medium", size: 11},
                },
            },
        },
        plugins: {
            legend: {
                display: series.length > 1,
                align: "end",
                labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    usePointStyle: true,
                    pointStyle: "circle",
                    color: "#475569",
                    font: {family: "IS_Medium", size: 12},
                },
            },
            tooltip: {
                backgroundColor: "#0f172a",
                padding: 10,
                cornerRadius: 8,
                titleFont: {family: "IS_Medium"},
                bodyFont: {family: "IS_Medium"},
                callbacks: {
                    label: (context) =>
                        ` ${context.dataset.label}: ${Number(context.parsed.y).toLocaleString("fa-IR")}`,
                },
            },
        },
    };

    return (
        <div className="w-full h-[260px]">
            <Line data={data} options={options}/>
        </div>
    );
}
