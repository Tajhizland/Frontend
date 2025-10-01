"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {columns} from "@/app/admin/role/TableRow";
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
                    pathname: 'edit/' + value,
                };
            }
        }
    ]

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

            <DataTable
                apiUrl={"admin/role/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
