"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/page/TableRow";
 import {update, pageTable} from "@/services/api/admin/page";
import {toast} from "react-hot-toast";
import {PageResponse} from "@/services/types/page";


export default function Page() {
    const submit = (e: PageResponse) =>
        update(e.id, {title: e.title,
                url: e.url,
                status: e.status,
                image: null ,
                content: e.content,
            });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "صفحه",
                href: "page"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت صفحه
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/page/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={pageTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
