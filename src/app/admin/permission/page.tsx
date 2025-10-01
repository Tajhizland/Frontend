"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {columns} from "@/app/admin/permission/TableRow";
import {DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {UrlObject} from "node:url";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function Page() {


    const buttons: DataTableButtons[] = [
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
            type: "link",
            colorClass: "bg-white text-white border border-slate-900 outline-none ",
            href: (value: any): UrlObject => {
                return {
                    pathname: 'permission/edit/' + value,
                };
            }
        }
    ]

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

            <DataTable
                apiUrl={"admin/permission/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
