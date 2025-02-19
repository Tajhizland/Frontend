"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/news/TableRow";
 import {update} from "@/services/api/admin/news";
import {toast} from "react-hot-toast";
import {NewsResponse} from "@/services/types/news";


export default function Page() {
    async function submit(e: NewsResponse) {
        let response=await update(
            {
                id: e.id,
                title: e.title,
                url: e.url,
                published: e.published,
                image: null ,
                content: e.content,
                categoryId:e.category_id
            }
        )
        toast.success(response?.message as string)
    }
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
                <Link href={{pathname: "/admin/news/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/news/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
