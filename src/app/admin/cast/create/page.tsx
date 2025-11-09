"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/cast/Form";
import { store } from "@/services/api/admin/cast";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    async function submit(e: FormData) {

        setLoading(true);
        let response = await store(
            {
                title: e.get("title") as string,
                url: e.get("url") as string,
                status: Number(e.get("status")),
                vlog_id: Number(e.get("vlog_id")),
                audio: e.get("audio") as File,
                image: e.get("image") as File,
                description: e.get("description") as string,
                setProgress: setProgress,
            }
        )
        toast.success(response?.message as string)
        if (response?.success) {
            router.push("/admin/cast");
        }
        setLoading(false);
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "cast",
                href: "cast"
            },
            {
                title: "افزودن cast جدید",
                href: "cast/create"
            }
        ]} />
        <Panel>
            <PageTitle>
                ایجاد cast جدید
            </PageTitle>
            <div>
                <Form submit={submit} loading={loading} />
            </div>
            {progress > 0 && <div className="w-full bg-gray-200 rounded-md mt-4">
                <div
                    className="bg-[#fcb415] text-xs font-medium text-white text-center p-1 leading-none rounded-md"
                    style={{ width: `${progress}%` }}
                >
                    {progress}%
                </div>
            </div>}
        </Panel>
    </>)
}
