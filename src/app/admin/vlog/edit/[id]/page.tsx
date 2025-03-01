"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/vlog/Form";
import {update} from "@/services/api/admin/vlog";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {findById} from "@/services/api/admin/vlog";
import {useQuery} from "react-query";
import PageTab from "@/components/Tabs/PageTab";
import React, {useState} from "react";
import {BarLoader} from "react-spinners";

export default function Page() {
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);
    const {id} = useParams();
    const {data: data} = useQuery({
        queryKey: [`vlog-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {
        setLoading(true);
        let response = await update(
            {
                id: Number(id),
                title: e.get("title") as string,
                categoryId: e.get("categoryId") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                video: e.get("video") as File,
                poster: e.get("poster") as File,
                description: e.get("description") as string,
                setProgress: setProgress, // فرستادن تابع برای نمایش درصد آپلود
            }
        )
        setLoading(false);
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "ولاگ",
                href: "vlog"
            },
            {
                title: "ویرایش ولاگ",
                href: "vlog/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش ولاگ
            </PageTitle>
            <PageTab id={id + ""}/>
            <div>
                <Form data={data} submit={submit} loading={loading}/>
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
