"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuMessageSquare } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {columns} from "@/app/admin/sms/TableRow";
import {defineActions} from "@/shared/Table/types";
import {SmsLogResponse} from "@/services/types/smsLog";
import {HiMiniPencil} from "react-icons/hi2";
import {smsTable} from "@/services/api/admin/sms";

export default function Page() {


    const actions = defineActions<SmsLogResponse>([
        {
            label: <HiMiniPencil className={"w-4 h-4"} title={"مشاهده"}/>,
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
            <PageLink>
                <ToolbarButton href={"/admin/sms/send"} icon={<LuMessageSquare className="w-4 h-4" />}>ارسال پیامک به کاربران</ToolbarButton>
                <ToolbarButton href={"/admin/phone-bock/sms"} icon={<LuMessageSquare className="w-4 h-4" />}>ارسال پیامک به مخاطبان</ToolbarButton>
            </PageLink>

            <Table

                fetcher={smsTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
