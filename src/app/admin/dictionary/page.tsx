"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/dictionary/TableRow";
import {update, dictionaryTable} from "@/services/api/admin/dictionary";
import {toast} from "react-hot-toast";
import {DictionaryResponse} from "@/services/types/dictionary";
import {removeById} from "@/services/api/admin/dictionary";


export default function Page() {
    async function submit(e: DictionaryResponse) {
        let response = await update(e.id, {original_word: e.original_word,
                mean: e.mean,
            }
        )
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
                <ToolbarButton href="/admin/dictionary/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={dictionaryTable}
                columns={columns}
                onDelete={removeById}
                actions={actions}
            />
        </Panel>
    </>)
}
