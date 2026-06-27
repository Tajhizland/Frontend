"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {columns} from "@/app/admin/permission/TableRow";
import {defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {PermissionResponse} from "@/services/types/permission";
import {permissionTable} from "@/services/api/admin/permission";

export default function Page() {


    const actions = defineActions<PermissionResponse>([
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
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
            <PageTitle>
                <Link href={"/admin/permission/create"}>
                    <ButtonPrimary>
                       ایجاد دسترسی
                    </ButtonPrimary>
                </Link>
            </PageTitle>

            <Table
                fetcher={permissionTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
