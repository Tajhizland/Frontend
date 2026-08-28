"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/news/TableRow";
 import {update, newsTable} from "@/services/api/admin/news";
import {toast} from "react-hot-toast";
import {NewsResponse} from "@/services/types/news";


export default function Page() {
    const submit = (e: NewsResponse) =>
        update(e.id, {title: e.title,
                url: e.url,
                published: e.published,
                image: null ,
                content: e.content,
                categoryId:e.category_id
            });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "بلاگ",
                href: "news"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت بلاگ
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/news/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={newsTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
