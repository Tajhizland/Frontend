"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {columns} from "@/app/admin/role/TableRow";
import {defineActions} from "@/shared/Table/types";
import {RoleResponse} from "@/services/types/role";
import {roleTable} from "@/services/api/admin/role";
import {HiMiniPencil} from "react-icons/hi2";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function Page() {


    const actions = defineActions<RoleResponse>([
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
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
            <PageTitle>
                <Link href={"/admin/role/create"}>
                    <ButtonPrimary>
                       ایجاد نقش
                    </ButtonPrimary>
                </Link>
            </PageTitle>

            <Table
                fetcher={roleTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
