"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/dictionary/Form";
import {update, findById} from "@/services/api/admin/dictionary";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";

export default function Page() {
    const {id} = useParams();
    const {data: data} = useQuery({
        queryKey: [`dictionary-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {
        let response = await update(
            {
                id: Number(id),
                original_word: e.get("original_word") as string,
                mean: e.get("mean") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "تنظیمات دیکشنری",
                href: "dictionary"
            },
            {
                title: "ویرایش دیکشنری",
                href: "dictionary/update/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش دیکشنری
            </PageTitle>
            <div>
                <Form data={data} submit={submit}/>
            </div>
        </Panel>

    </>)
}
