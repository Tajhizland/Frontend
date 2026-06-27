"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {columns} from "@/app/admin/phone-bock/TableRow";
import {defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {PhoneBockResponse} from "@/services/types/phoneBock";
import {phoneBockTable} from "@/services/api/admin/phoneBock";

export default function Page() {


    const actions = defineActions<PhoneBockResponse>([
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
            href: (row) => `phone-bock/edit/${row.id}`
        }
    ])

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

            <Table
                fetcher={phoneBockTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
