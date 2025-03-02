"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/vlog/Form";
import {store} from "@/services/api/admin/vlog";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);

    async function submit(e: FormData) {
        setLoading(true);
        let response = await store(
            {
                title: e.get("title") as string,
                url: e.get("url") as string,
                categoryId: e.get("categoryId") as string,
                status: e.get("status") as string,
                video: e.get("video") as File,
                poster: e.get("poster") as File,
                description: e.get("description") as string,
                setProgress: setProgress, // فرستادن تابع برای نمایش درصد آپلود
            }
        )
        setLoading(false);
        toast.success(response?.message as string)
        router.push("/admin/vlog");
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "ولاگ",
                href: "vlog"
            },
            {
                title: "افزودن ولاگ جدید",
                href: "vlog/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن ولاگ جدید
            </PageTitle>
            <div>
                <Form loading={loading} submit={submit}/>
            </div>
            <div className="w-full bg-gray-200 rounded-md mt-4">
                <div
                    className="bg-[#fcb415] text-xs font-medium text-white text-center p-1 leading-none rounded-md"
                    style={{ width: `${progress}%` }}
                >
                    {progress}%
                </div>
            </div>
        </Panel>
    </>)
}
