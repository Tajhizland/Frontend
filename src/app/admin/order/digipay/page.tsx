"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PersianDatePicker from "@/shared/DatePicker/PersianDatePicker";
import {useState} from "react";
import {useMutation} from "react-query";
import {digipayCalc} from "@/services/api/admin/order";

export default function Page() {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [res, setRes] = useState(0);


    const actionDigipayCalc = useMutation({
        mutationKey: [`digipayCalc`],
        mutationFn: async () => {
            return digipayCalc({start_date: startDate, end_date: endDate});
        },
        onSuccess: (response) => {
            if (!response)
                return;
            setRes(response?.value);
        },
    });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "سفارشات",
                href: "order"
            }, {
                title: " گزارش دیجی پی",
                href: "order/digipay"
            },
        ]}/>
        <Panel>
            <PageTitle>
                گزارش دیجی پی
            </PageTitle>

            <div className={"flex flex-col gap-4"}>
                <div className="flex gap-4">
                    <label className={"flex-shrink-0"}>از تاریخ</label>
                    <PersianDatePicker onChange={(e) => {
                        setStartDate(e)
                    }}/>
                </div>
                <div className="flex gap-4">
                    <label className={"flex-shrink-0"}>تا تاریخ</label>
                    <PersianDatePicker onChange={(e) => {
                        setEndDate(e)
                    }}/>
                </div>
                <ButtonPrimary onClick={() => {
                    actionDigipayCalc.mutateAsync()
                }}>
                    محاسبه
                </ButtonPrimary>
            </div>
            <div className={"  text-center p-4 bg-green-100 text-green-800 rounded-2xl border-green-800"}>
                {res.toLocaleString()}
            </div>


        </Panel>
    </>)
}
