"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/option/TableRow";
import {optionTable, update} from "@/services/api/admin/option";
import {toast} from "react-hot-toast";
import {OptionResponse} from "@/services/types/option";


export default function Page() {
    async function submit(e: OptionResponse) {
        let response = await update(
            {
                id: e.id,
                title: e.title,
                status: e.status,
                category_id:e.category_id
            }
        )
        toast.success(response?.message as string)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "ویژگی ها",
                href: "option"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت ویژگی ها
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/option/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={optionTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
