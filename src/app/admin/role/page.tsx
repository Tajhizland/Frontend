"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {columns} from "@/app/admin/role/TableRow";
import {defineActions} from "@/shared/Table/types";
import {RoleResponse} from "@/services/types/role";
import {roleTable} from "@/services/api/admin/role";
import {HiMiniPencil} from "react-icons/hi2";

export default function Page() {


    const actions = defineActions<RoleResponse>([
        {
            label: <HiMiniPencil className={"w-4 h-4"} title={"ویرایش"}/>,
            href: (row) => `role/edit/${row.id}`,
        }
    ])

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "نقش ها",
                href: "role"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت نقش ها
            </PageTitle>
            <PageLink>
                <ToolbarButton href={"/admin/role/create"} icon={<LuPlus className="w-4 h-4" />}>ایجاد نقش</ToolbarButton>
            </PageLink>

            <Table
                fetcher={roleTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
