"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/blog_category/TableRow";
import {update, blogCategoryTable} from "@/services/api/admin/blogCategory";
import {toast} from "react-hot-toast";
import {BlogCategoryResponse} from "@/services/types/blogCategory";


export default function Page() {
    const submit = (e: BlogCategoryResponse) =>
        update(e.id, {name: e.name,
                status: e.status,
                url: e.url,
            });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته بندی بلاگ",
                href: "blogCategory"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دسته بندی بلاگ
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/blog_category/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={blogCategoryTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
