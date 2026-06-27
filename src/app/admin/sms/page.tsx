"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {columns} from "@/app/admin/sms/TableRow";
import {defineActions} from "@/shared/Table/types";
import {SmsLogResponse} from "@/services/types/smsLog";
import {HiMiniPencil} from "react-icons/hi2";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {smsTable} from "@/services/api/admin/sms";

export default function Page() {


    const actions = defineActions<SmsLogResponse>([
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"مشاهده"}/>,
            href: (row) => `sms/${row.id}`,
        }
    ])

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
                        ارسال پیامک به کاربران
                    </ButtonPrimary>
                </Link>
                <Link href={"/admin/phone-bock/sms"}>
                    <ButtonPrimary>
                         ارسال پیامک به مخاطبان
                    </ButtonPrimary>
                </Link>
            </PageTitle>

            <Table

                fetcher={smsTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
