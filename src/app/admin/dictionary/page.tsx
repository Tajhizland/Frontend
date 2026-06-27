"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/dictionary/TableRow";
import {update, dictionaryTable} from "@/services/api/admin/dictionary";
import {toast} from "react-hot-toast";
import {DictionaryResponse} from "@/services/types/dictionary";
import {removeById} from "@/services/api/admin/dictionary";


export default function Page() {
    async function submit(e: DictionaryResponse) {
        let response = await update(
            {
                id: e.id,
                original_word: e.original_word,
                mean: e.mean,
            }
        )
        if (response?.success)
            toast.success(response?.message as string)
    }

    async function removeItem(id: any) {
        let response = await removeById(id);
        if (response?.success)
            toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دیکشنری",
                href: "dictionary"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دیکشنری
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/dictionary/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={dictionaryTable}
                columns={columns}
                onDelete={removeItem}
                actions={actions}
            />
        </Panel>
    </>)
}
