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
            label: <div>محصولات </div>,
            type: "link",
            colorClass: "bg-white text-black border border-slate-900 outline-none whitespace-nowrap",
            href: (value: any): UrlObject => {
                return {
                    pathname: 'group/product/' + value,
                };
            }
        }, {
            label: <div>فیلد ها </div>,
            type: "link",
            colorClass: "bg-white text-black border border-slate-900 outline-none whitespace-nowrap",
            href: (value: any): UrlObject => {
                return {
                    pathname: 'group/field/' + value,
                };
            }
        }, {
            label: <div>مقدار فیلد </div>,
            type: "link",
            colorClass: "bg-white text-black border border-slate-900 outline-none whitespace-nowrap",
            href: (value: any): UrlObject => {
                return {
                    pathname: 'group/field-value/' + value,
                };
            }
        },
    ]
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات گروهی",
                href: "group"
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
