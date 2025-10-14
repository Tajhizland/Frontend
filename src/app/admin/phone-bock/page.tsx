"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {columns} from "@/app/admin/phone-bock/TableRow";
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
                    pathname: 'phone-bock/edit/' + value,
                };
            }
        }
    ]

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دفترچه تلفن",
                href: "phone-bock"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دفترچه تلفن
            </PageTitle>
            <PageTitle>
                <Link href={"/admin/phone-bock/create"}>
                    <ButtonPrimary>
                       ایجاد
                    </ButtonPrimary>
                </Link>
                <Link href={"/admin/phone-bock/sms"}>
                    <ButtonPrimary>
                       ارسال پیامک
                    </ButtonPrimary>
                </Link>
                <Link href={"/admin/phone-bock/excel"}>
                    <ButtonPrimary>
                       افزودن با اکسل
                    </ButtonPrimary>
                </Link>
            </PageTitle>

            <DataTable
                apiUrl={"admin/phone-bock/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
