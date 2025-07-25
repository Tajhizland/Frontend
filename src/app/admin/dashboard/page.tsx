"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import LineChart from "@/components/Chart/LineChart";
import {FaComment, FaFileInvoiceDollar} from "react-icons/fa";
import {MdOutlinePendingActions} from "react-icons/md";
import {useQuery} from "react-query";
import {dashboard} from "@/services/api/admin/dashboard";
import {UserPlusIcon} from "@heroicons/react/24/solid";
import PersianDatePicker from "@/shared/DatePicker/PersianDatePicker";
import {useState} from "react";
import Spinner from "@/shared/Loading/Spinner";

export default function Page() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const {data: data, isSuccess , isLoading} = useQuery({
        queryKey: [`dashboard`, fromDate, toDate],
        queryFn: () => dashboard(fromDate, toDate),
        staleTime: 5000,
    });

    return (<>
        <Breadcrump breadcrumb={[]}/>
        <Panel>
            <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"}>
                <Panel className={"!bg-rose-500 text-white text-center "}>
                    <div className={"flex flex-col gap-y-2 items-center"}>
                        <FaFileInvoiceDollar className={"w-8 h-8"}/>
                        <span className={"font-bold"}>سفارش جدید</span>
                        <span className={"font-bold"}>{data?.newOrder}</span>
                    </div>
                </Panel>
                <Panel className={"!bg-slate-800 text-white text-center"}>
                    <div className={"flex flex-col gap-y-2 items-center"}>
                        <FaComment className={"w-8 h-8"}/>
                        <span className={"font-bold"}>کامنت جدید</span>
                        <span className={"font-bold"}>{data?.newComment}</span>
                    </div>
                </Panel>
                <Panel className={"!bg-teal-500 text-white text-center"}>
                    <div className={"flex flex-col gap-y-2 items-center"}>
                        <MdOutlinePendingActions className={"w-8 h-8"}/>
                        <span className={"font-bold"}>  سفارش معلق جدید</span>
                        <span className={"font-bold"}>{data?.newOnHoldOrder}</span>
                    </div>
                </Panel>
                <Panel className={"!bg-indigo-500 text-white text-center"}>
                    <div className={"flex flex-col gap-y-2  items-center"}>
                        <UserPlusIcon className={"w-8 h-8"}/>
                        <span className={"font-bold"}>کاربر جدید</span>
                        <span className={"font-bold"}>{data?.newUser}</span>
                    </div>
                </Panel>
            </div>
        </Panel>

        <Panel>
            <div className={"grid grid-cols-2 gap-5"}>
                <div>
                    <label>
                        از تاریخ
                    </label>
                    <PersianDatePicker
                        onChange={(date) => {
                            setFromDate(date)
                        }}/>
                </div>
                <div>
                    <label>
                        تا تاریخ
                    </label>
                    <PersianDatePicker
                        onChange={(date) => {
                            setToDate(date)
                        }}/>
                </div>
            </div>
        </Panel>

        <div className={"grid grid-cols-1 lg:grid-cols-2"}>
            <Panel>
                <div>
                    <PageTitle>
                        نمودار تعداد بازدید از صفحات
                    </PageTitle>
                    {
                        isLoading && <Spinner />
                    }
                    {isSuccess &&
                        <LineChart data={data.viewLog} XLabel={"تاریخ"} YLabel={"تعداد بازدید "} label={"تعداد"}
                                   borderColor={"rgb(23,255,0)"} backgroundColor={"rgba(23,255,0,0.5)"}/>}
                </div>
            </Panel>
            <Panel>
                <div>
                    <PageTitle>
                        نمودار تعداد بازدید از سایت
                    </PageTitle>
                    {
                        isLoading && <Spinner />
                    }
                    {isSuccess &&
                        <LineChart data={data.viewIpLog} XLabel={"تاریخ"} YLabel={"تعداد بازدید"} label={"تعداد"}
                                   borderColor={"rgba(2,44,255)"} backgroundColor={"rgba(2,44,255,0.5)"}/>}
                </div>
            </Panel>
            <Panel>
                <div>
                    <PageTitle>
                        نمودار تعداد فروش
                    </PageTitle>
                    {
                        isLoading && <Spinner />
                    }
                    {isSuccess &&
                        <LineChart data={data.totalCount} XLabel={"تاریخ"} YLabel={"تعداد فروش "} label={"تعداد"}
                                   borderColor={"rgb(75, 192, 192)"} backgroundColor={"rgba(75, 192, 192,0.5)"}/>}
                </div>
            </Panel>
            <Panel>
                <div>
                    <PageTitle>
                        نمودار مقدار فروش
                    </PageTitle>
                    {
                        isLoading && <Spinner />
                    }
                    {isSuccess &&
                        <LineChart data={data.totalPrice} XLabel={"تاریخ"} YLabel={"فروش (تومان)"} label={"تومان"}
                                   borderColor={"rgb(250, 50, 192)"} backgroundColor={"rgba(250, 50, 192,0.5)"}/>}
                </div>
            </Panel>
        </div>
    </>)
}
