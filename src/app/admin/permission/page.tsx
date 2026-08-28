"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {columns} from "@/app/admin/permission/TableRow";
import {defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {PermissionResponse} from "@/services/types/permission";
import {permissionTable} from "@/services/api/admin/permission";

export default function Page() {


    const actions = defineActions<PermissionResponse>([
        {
            label: <HiMiniPencil className={"w-4 h-4"} title={"ویرایش"}/>,
            href: (row) => `permission/edit/${row.id}`
        }
    ])

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسترسی ها",
                href: "permission"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دسترسی ها
            </PageTitle>
            <PageLink>
                <ToolbarButton href={"/admin/permission/create"} icon={<LuPlus className="w-4 h-4" />}>ایجاد دسترسی</ToolbarButton>
            </PageLink>

            <Table
                fetcher={permissionTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
