"use client";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale, // برای استفاده از تاریخ به عنوان دسته‌بندی
    LinearScale,
    Title,
    Tooltip,
    Legend
);

// تعریف نوع داده‌ها (Props)
interface LineChartProps {
    data: { date: string; value: number }[]; // آرایه‌ای از اشیاء که شامل تاریخ و مقدار بازدید هستند
    XLabel: string; // عنوان محور X
    YLabel: string; // عنوان محور Y
    borderColor: string; // رنگ حاشیه نمودار
    backgroundColor: string; // رنگ پس‌زمینه نمودار
    label: string; // برچسب داده‌ها
}

const LineChart: React.FC<LineChartProps> = ({ data, XLabel, YLabel, borderColor, backgroundColor, label }) => {
    const chartData: ChartData<'line'> = {
        labels: data.map(d => d.date),
        datasets: [
            {
                label: label,
                data: data.map(d => d.value),
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const chartOptions: ChartOptions<'line'> = {
        scales: {
            x: {
                type: 'category', // استفاده از مقیاس دسته‌بندی (متنی) برای محور x
                title: {
                    display: true,
                    text: XLabel,
                    font: {
                        family: 'IS_Medium',
                        size: 14,
                    },
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: YLabel,
                    font: {
                        family: 'IS_Medium',
                        size: 14,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    font: {
                        family: 'IS_Medium',
                        size: 12,
                    },
                },
            },
            tooltip: {
                titleFont: {
                    family: 'IS_Medium',
                },
                bodyFont: {
                    family: 'IS_Medium',
                },
            },
        },
    };

    return (
        <div className="w-full h-full">
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default LineChart;
