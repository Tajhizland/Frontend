"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {columns} from "@/app/admin/sms/[id]/TableRow";
import {defineActions} from "@/shared/Table/types";
import {SmsLogItemResponse} from "@/services/types/smsLogItem";
import {smsItemTable} from "@/services/api/admin/sms";
import {HiMiniPencil} from "react-icons/hi2";
import {useParams} from "next/navigation";
import {useMemo} from "react";

export default function Page() {
    const {id} = useParams();
    const fetcher = useMemo(() => smsItemTable(id), [id]);

    const actions = defineActions<SmsLogItemResponse>([
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"مشاهده"}/>,
            href: (row) => `sms/${row.id}`,
        }
    ])

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پیامک ها",
                href: "sms"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت پیامک ها
            </PageTitle>
            <Table
                fetcher={fetcher}
                columns={columns}
                actions={[]}
            />


        </Panel>
    </>)
}
