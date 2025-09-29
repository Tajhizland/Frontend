"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/dictionary/Form";
import {update, findById, store} from "@/services/api/admin/dictionary";
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

    async function submit(data: { original_words: string[]; mean: string }) {
        let word = data.original_words[0];
        let response = await update({
            id: Number(id),
            original_word: word,
            mean: data.mean,
        });
        if (response?.success)
            toast.success("عملیات با موفقیت انجام شد");
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
                {data&&<Form data={data} submit={submit}/>}
            </div>
        </Panel>

    </>)
}
