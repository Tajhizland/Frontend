"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PersianDatePicker from "@/shared/DatePicker/PersianDatePicker";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {gatewayCalc} from "@/services/api/admin/order";
import Prices from "@/components/Price/Prices";

export default function GatewayReport({gateway, title}: {gateway: "digipay" | "snappay" | "zibal"; title: string}) {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [res, setRes] = useState(0);


    const actionDigipayCalc = useMutation({
        mutationKey: ["gateway-report", gateway],
        mutationFn: async () => {
            return gatewayCalc(gateway, {start_date: startDate, end_date: endDate});
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
                title: title,
                href: "order/" + gateway
            },
        ]}/>
        <Panel>
            <PageTitle>
                {title}
            </PageTitle>

            <div className={"flex flex-col gap-4"}>
                <div className="flex gap-4">
                    <label className={"shrink-0"}>از تاریخ</label>
                    <PersianDatePicker onChange={(e) => {
                        setStartDate(e)
                    }}/>
                </div>
                <div className="flex gap-4">
                    <label className={"shrink-0"}>تا تاریخ</label>
                    <PersianDatePicker onChange={(e) => {
                        setEndDate(e)
                    }}/>
                </div>
                <ButtonPrimary disabled={!startDate || !endDate || endDate < startDate || actionDigipayCalc.isPending}
                    onClick={() => actionDigipayCalc.mutate()}>
                    محاسبه
                </ButtonPrimary>
            </div>
            <div className={"  text-center p-4 bg-green-100 text-green-800 rounded-2xl border-green-800"}>
                <Prices price={res}/>
            </div>


        </Panel>
    </>)
}
