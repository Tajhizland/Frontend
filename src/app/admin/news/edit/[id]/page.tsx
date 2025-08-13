"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/news/Form";
import {update} from "@/services/api/admin/news";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {findById} from "@/services/api/admin/news";
import {useQuery} from "react-query";
import NewsTab from "@/components/Tabs/NewsTab";

export default function Page() {
    const {id} = useParams();
    const {data: data} = useQuery({
        queryKey: [`news-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {
        let response = await update(
            {
                id: Number(id),
                title: e.get("title") as string,
                url: e.get("url") as string,
                categoryId: Number(e.get("categoryId") ),
                published: e.get("published") as string,
                image: e.get("image") as File,
                content: e.get("content") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "بلاگ",
                href: "news"
            },
            {
                title: "ویرایش بلاگ",
                href: "news/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش بلاگ
            </PageTitle>
            <NewsTab id={id + ""}/>
            <div>
                <Form data={data} submit={submit}/>
            </div>
        </Panel>

    </>)
}
