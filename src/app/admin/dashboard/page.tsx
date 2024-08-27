import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Tag from "@/shared/Tag/Tag";
import {Alert} from "@/shared/Alert/Alert";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LineChart from "@/components/Chart/LineChart";
import {FaComment, FaFileInvoiceDollar} from "react-icons/fa";
import {MdOutlinePendingActions} from "react-icons/md";
import {TbTruckReturn} from "react-icons/tb";

export default function page() {
    const chartData = [
        {date: '1403/01/01', value: 10},
        {date: '1403/01/02', value: 15},
        {date: '1403/01/03', value: 8},
        {date: '1403/01/04', value: 25},
        {date: '1403/01/05', value: 20},
    ];
    return (<>
        <Breadcrump breadcrumb={[]}/>
        <Panel>
            <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"}>
                <Panel className={"bg-rose-500 text-white text-center "}>
                    <div className={"flex flex-col gap-y-2 items-center"}>
                        <FaFileInvoiceDollar  className={"w-8 h-8"}/>
                        <span className={"font-bold"}>سفارش جدید</span>
                        <span className={"font-bold"}>0</span>
                    </div>
                </Panel>
                <Panel className={"bg-slate-800 text-white text-center"}>
                    <div className={"flex flex-col gap-y-2 items-center"}>
                        <FaComment  className={"w-8 h-8"}/>
                        <span className={"font-bold"}>کامنت جدید</span>
                        <span className={"font-bold"}>0</span>
                    </div>
                </Panel>
                <Panel className={"bg-teal-500 text-white text-center"}>
                    <div className={"flex flex-col gap-y-2 items-center"}>
                        <MdOutlinePendingActions  className={"w-8 h-8"}/>
                        <span className={"font-bold"}>درخواست سفارش جدید</span>
                        <span className={"font-bold"}>0</span>
                    </div>
                </Panel>
                <Panel className={"bg-indigo-500 text-white text-center"}>
                    <div className={"flex flex-col gap-y-2  items-center"}>
                        <TbTruckReturn  className={"w-8 h-8"}/>
                        <span className={"font-bold"}>مرجوعی جدید</span>
                        <span className={"font-bold"}>0</span>
                    </div>
                </Panel>
            </div>
        </Panel>

        <div className={"grid grid-cols-1 lg:grid-cols-2"}>
            <Panel>
                <div>
                    <PageTitle>
                        نمودار بازدید
                    </PageTitle>
                    <LineChart data={chartData} XLabel={"تاریخ"} YLabel={"تعداد بازدید "} label={"تعداد"}
                               borderColor={"rgb(75, 192, 192)"} backgroundColor={"rgba(75, 192, 192,0.5)"}/>
                </div>
            </Panel>
            <Panel>
                <div>
                    <PageTitle>
                        نمودار فروش
                    </PageTitle>
                    <LineChart data={chartData} XLabel={"تاریخ"} YLabel={"فروش (تومان)"}  label={"تومان"}
                               borderColor={"rgb(250, 50, 192)"} backgroundColor={"rgba(250, 50, 192,0.5)"}/>
                </div>
            </Panel>

        </div>
    </>)
}
