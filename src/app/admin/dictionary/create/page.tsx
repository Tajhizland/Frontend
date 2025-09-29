"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/dictionary/Form";
import {store} from "@/services/api/admin/dictionary";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();

    async function submit(data: { original_words: string[]; mean: string }) {
        let success = true;
        for (let word of data.original_words) {
            if (word == "")
                continue;
            let response = await store({
                original_word: word,
                mean: data.mean,
            });
            if (!response?.success)
                success = false;
        }
        if (success)
            toast.success("عملیات با موفقیت انجام شد");
        router.push("/admin/dictionary");
    }


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دیکشنری",
                href: "dictionary"
            },
            {
                title: "افزودن دیکشنری",
                href: "dictionary/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن دیکشنری جدید
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>
    </>)
}
