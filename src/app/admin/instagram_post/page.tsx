"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import {LuArrowDownUp, LuPlus} from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/instagram_post/TableRow";
import {destroy, instagramPostTable, update} from "@/services/api/admin/instagramPost";
import {InstagramPostResponse} from "@/services/types/instagramPost";

export default function Page() {
    const submit = (row: InstagramPostResponse) =>
        update(row.id, {
            caption: row.caption,
            status: row.status,
        });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پست های اینستاگرام",
                href: "instagram_post"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت پست های اینستاگرام
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/instagram_post/create" icon={<LuPlus className="w-4 h-4"/>}>
                    ایجاد
                </ToolbarButton>
                <ToolbarButton href="/admin/instagram_post/sort" icon={<LuArrowDownUp className="w-4 h-4"/>}>
                    سورت کردن
                </ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                onDelete={(id) => destroy(Number(id))}
                fetcher={instagramPostTable}
                columns={columns}
                actions={actions}
                deleteMessage="با حذف پست، همه‌ی فایل‌های آن هم پاک می‌شوند. مطمئنید؟"
            />
        </Panel>
    </>)
}
