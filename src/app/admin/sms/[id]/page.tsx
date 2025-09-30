"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {columns} from "@/app/admin/sms/[id]/TableRow";
import {DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {UrlObject} from "node:url";
import {useParams} from "next/navigation";

export default function Page() {
    const {id} = useParams();

    const buttons: DataTableButtons[] = [
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"مشاهده"}/>,
            type: "link",
            colorClass: "bg-white text-white border border-slate-900 outline-none ",
            href: (value: any): UrlObject => {
                return {
                    pathname: 'sms/' + value,
                };
            }
        }
    ]

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
            <DataTable

                apiUrl={"admin/sms/item/" + id}
                columns={columns}
                buttons={[]}
            />


        </Panel>
    </>)
}
