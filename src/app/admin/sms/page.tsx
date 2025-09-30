"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {columns} from "@/app/admin/sms/TableRow";
import {DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {UrlObject} from "node:url";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function Page() {


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
            <PageTitle>
                <Link href={"/admin/sms/send"}>
                    <ButtonPrimary>
                        ارسال پیامک
                    </ButtonPrimary>
                </Link>
            </PageTitle>

            <DataTable

                apiUrl={"admin/sms/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
