"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuMessageSquare, LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {columns} from "@/app/admin/phone-bock/TableRow";
import {defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {PhoneBockResponse} from "@/services/types/phoneBock";
import {phoneBockTable} from "@/services/api/admin/phoneBock";

export default function Page() {


    const actions = defineActions<PhoneBockResponse>([
        {
            label: <HiMiniPencil className={"w-4 h-4"} title={"ویرایش"}/>,
            href: (row) => `phone-bock/edit/${row.id}`
        }
    ])

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دفترچه تلفن",
                href: "phone-bock"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دفترچه تلفن
            </PageTitle>
            <PageLink>
                <ToolbarButton href={"/admin/phone-bock/create"} icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
                <ToolbarButton href={"/admin/phone-bock/sms"} icon={<LuMessageSquare className="w-4 h-4" />}>ارسال پیامک</ToolbarButton>
                <ToolbarButton href={"/admin/phone-bock/excel"} icon={<LuPlus className="w-4 h-4" />}>افزودن با اکسل</ToolbarButton>
            </PageLink>

            <Table
                fetcher={phoneBockTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
