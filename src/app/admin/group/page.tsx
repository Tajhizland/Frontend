"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {columns} from "@/app/admin/group/TableRow";
import {DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {UrlObject} from "node:url";

export default function Page() {
    const buttons: DataTableButtons[] = [
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
            type: "link",
            colorClass: "bg-white text-white border border-slate-900 outline-none ",
            href: (value: any): UrlObject => {
                return {
                    pathname: 'group/edit/' + value,
                };
            }
        },
    ]
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            }
        ]}/>

        <Panel>
            <PageTitle>
                مدیریت محصولات گروهی
            </PageTitle>

            <DataTable
                apiUrl={"admin/group/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
